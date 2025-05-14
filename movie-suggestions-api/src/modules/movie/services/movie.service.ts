import axios from 'axios';
import ReactionRepository from '../../reaction/repository/reaction.repository';
import {
  TMDBGenres,
  TMDBmovie,
  TMDBmovieScore,
  TMDBSearch,
  TMDBSearchResponse,
} from '../dto/tmdbmovie.dto';
import { InternalServerError } from '../../../core/errors/internal-server.error';
import { NotFoundError } from '../../../core/errors/not-found.error';
import { ValidationError } from '../../../core/errors/validation.error';
import { ENV } from '../../../config/env';
import cache from '../../../core/utils/cache';
import { ErrorBase } from '../../../core/errors/base.error';
import { redisClient } from '../../../infra/redis/client';

class MovieService {
  private reactionRepository: ReactionRepository;
  constructor(reactionRepository?: ReactionRepository) {
    this.reactionRepository = reactionRepository ?? new ReactionRepository();
  }

  async getMovieByName(name: string): Promise<TMDBSearch> {
    try {
      if (!name) throw new ValidationError('Insira o nome de um filme');

      const cachedMovie = await cache<TMDBSearch>(name);

      if (cachedMovie) return cachedMovie;

      const data = await this.fetchFromTMDB<TMDBSearch>(
        `https://api.themoviedb.org/3/search/movie?query=${name}&include_adult=false&language=pt-BR&page=1`,
      );

      if (!data.total_results) throw new NotFoundError('Filme não encontrado.');

      const genres = await this.getGenres();

      const resultsCombinedScore: TMDBmovieScore[] = data.results.map(
        (movie) => ({
          ...movie,
          poster_path: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          backdrop_path: `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`,
          combinedScore: this.calculateCombinedScore(movie),
          genre_names: this.mapGenres(movie, genres),
        }),
      );

      const resultsSortedByScore = this.sortMovies(resultsCombinedScore);

      const movie = { ...data, results: resultsSortedByScore };

      await redisClient.setEx(name, 3600, JSON.stringify(movie));

      return movie;
    } catch (error) {
      if (error instanceof ValidationError || error instanceof NotFoundError) {
        throw error;
      }
      throw new InternalServerError();
    }
  }

  async getMovieRecommendations(
    userId: string,
    pagesMap: Record<string, string>,
  ): Promise<TMDBSearchResponse[]> {
    try {
      const cacheKey = `recommendations:${userId}:${JSON.stringify(pagesMap)}`;

      const cachedRecommendations = await cache<TMDBSearchResponse[]>(cacheKey);

      if (cachedRecommendations) return cachedRecommendations;

      const id = Number(userId);

      if (!id) {
        throw new ValidationError('Insira o ID do usuário');
      }

      const likedMovies = await this.reactionRepository.getLikedMovies(id);

      if (!likedMovies.length)
        throw new NotFoundError('Não há filmes para se basear recomendações');

      const fetchedMovies = await Promise.all(
        likedMovies.map(async (movie) => {
          const page = pagesMap[movie.movieId] || '1';

          const data = await this.fetchFromTMDB<TMDBSearch>(
            `https://api.themoviedb.org/3/movie/${movie.movieId}/recommendations?language=pt-BR&page=${page}`,
          );

          const genres = await this.getGenres();

          const resultsCombinedScore: TMDBmovieScore[] = data.results.map(
            (movie) => ({
              ...movie,
              poster_path: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
              backdrop_path: `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`,
              combinedScore: this.calculateCombinedScore(movie),
              genre_names: this.mapGenres(movie, genres),
            }),
          );

          const resultsSortedByScore = this.sortMovies(resultsCombinedScore);

          const recommendations: TMDBSearchResponse = {
            movieTitle: movie.movieTitle,
            recommendations: resultsSortedByScore,
            page: data.page,
            total_pages: data.total_pages,
            total_results: data.total_results,
          };

          await redisClient.setEx(
            cacheKey,
            3600,
            JSON.stringify(recommendations),
          );

          return recommendations;
        }),
      );

      return fetchedMovies;
    } catch (error) {
      if (error instanceof ValidationError || error instanceof NotFoundError) {
        throw error;
      }
      throw new InternalServerError();
    }
  }

  async getTrendingMovies(): Promise<TMDBSearch> {
    try {
      const key = 'trending';

      const cached = await cache<TMDBSearch>(key);

      if (cached) return cached;

      const data = await this.fetchFromTMDB<TMDBSearch>(
        'https://api.themoviedb.org/3/trending/movie/week?language=pt-BR',
      );

      if (!data) throw new InternalServerError();

      const genres = await this.getGenres();

      const resultWithImgAndGenres: TMDBmovieScore[] = data.results.map(
        (movie) => ({
          ...movie,
          poster_path: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          backdrop_path: `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`,
          combinedScore: this.calculateCombinedScore(movie),
          genre_names: this.mapGenres(movie, genres),
        }),
      );

      const trending: TMDBSearch = {
        ...data,
        results: resultWithImgAndGenres,
      };

      await redisClient.setEx(key, 3600, JSON.stringify(trending));

      return trending;
    } catch (error) {
      if (error instanceof Error) throw new ErrorBase(400, error.message);
      throw error;
    }
  }

  async getGenres(): Promise<TMDBGenres> {
    try {
      const key = 'genres';

      const cached = await cache<TMDBGenres>(key);

      if (cached) return cached;

      const data = await this.fetchFromTMDB<TMDBGenres>(
        'https://api.themoviedb.org/3/genre/movie/list?language=pt',
      );

      if (!data) throw new InternalServerError();

      await redisClient.setEx(key, 3600, JSON.stringify(data));

      return data;
    } catch (error) {
      if (error instanceof ErrorBase) throw error;
      throw new InternalServerError();
    }
  }

  private mapGenres(movie: TMDBmovie, genres: TMDBGenres): string[] {
    return movie.genre_ids.map(
      (id) => genres.genres.find((g) => g.id === id)?.name || 'Desconhecido',
    );
  }

  private calculateCombinedScore(movie: TMDBmovie): number {
    return movie.vote_average * 0.6 + movie.popularity * 0.4;
  }

  private sortMovies(movies: TMDBmovieScore[]): TMDBmovieScore[] {
    return movies.sort((a, b) => b.combinedScore - a.combinedScore);
  }

  private async fetchFromTMDB<T>(url: string): Promise<T> {
    try {
      const { data } = await axios.get<T>(url, {
        headers: { Authorization: `Bearer ${ENV.TMBD_TOKEN}` },
      });
      return data;
    } catch {
      throw new InternalServerError();
    }
  }
}

export default MovieService;
