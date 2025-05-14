import axios from 'axios';
import cache from '../../../core/utils/cache';
import ReactionRepository from '../../reaction/repository/reaction.repository';
import MovieService from '../services/movie.service';
import { TMDBSearch, TMDBSearchResponse } from '../dto/tmdbmovie.dto';
import { ValidationError } from '../../../core/errors/validation.error';
import { NotFoundError } from '../../../core/errors/not-found.error';
import { InternalServerError } from '../../../core/errors/internal-server.error';

jest.mock('axios');
jest.mock('../../../core/utils/cache');
jest.mock('../../reaction/repository/reaction.repository');
jest.mock('../../../infra/redis/client', () => ({
  redisClient: {
    setEx: jest.fn(),
  },
}));

describe('MovieService', () => {
  let movieService: MovieService;
  let reactionRepoMock: jest.Mocked<ReactionRepository>;

  beforeEach(() => {
    reactionRepoMock = new (ReactionRepository as jest.Mock)();
    movieService = new MovieService(reactionRepoMock);
    jest.clearAllMocks();
  });

  describe('getMovieByName', () => {
    it('should throw ValidationError if name is empty', async () => {
      await expect(movieService.getMovieByName('')).rejects.toBeInstanceOf(
        ValidationError,
      );
    });

    it('should return cached result if present', async () => {
      const fakeCache = {
        total_results: 1,
        results: [],
        page: 1,
        total_pages: 1,
      } as TMDBSearch;
      (cache as jest.Mock).mockResolvedValue(fakeCache);

      const result = await movieService.getMovieByName('Inception');
      expect(cache).toHaveBeenCalledWith('Inception');
      expect(result).toEqual(fakeCache);
    });

    it('should throw NotFoundError when no movies found', async () => {
      (cache as jest.Mock).mockResolvedValue(null);
      (axios.get as jest.Mock).mockResolvedValue({
        data: { total_results: 0, results: [] },
      });

      await expect(
        movieService.getMovieByName('Unknown'),
      ).rejects.toBeInstanceOf(NotFoundError);
    });

    it('should return movies sorted with combinedScore', async () => {
      (cache as jest.Mock).mockResolvedValue(null);
      const movies = [
        {
          id: 1,
          vote_average: 8,
          popularity: 10,
          title: 'A',
          overview: '',
          release_date: '',
          poster_path: '',
          genre_ids: [],
          vote_count: 100,
          media_type: 'movie',
          original_title: '',
        },
        {
          id: 2,
          vote_average: 7,
          popularity: 5,
          title: 'B',
          overview: '',
          release_date: '',
          poster_path: '',
          original_title: '',
          genre_ids: [],
          media_type: 'movie',
          vote_count: 50,
        },
      ];

      (axios.get as jest.Mock).mockResolvedValue({
        data: {
          total_results: 2,
          results: movies,
          page: 1,
          total_pages: 1,
        },
      });

      const result = await movieService.getMovieByName('Test');

      expect(result.results[0].combinedScore).toBeDefined();
      expect(result.results[0].combinedScore).toBeGreaterThan(
        result.results[1].combinedScore,
      );
    });

    it('should throw InternalServerError on axios failure', async () => {
      (cache as jest.Mock).mockResolvedValue(null);
      (axios.get as jest.Mock).mockRejectedValue(new Error('network error'));

      await expect(movieService.getMovieByName('Error')).rejects.toBeInstanceOf(
        InternalServerError,
      );
    });
  });

  describe('getMovieRecommendations', () => {
    it('should throw ValidationError if userId is not numeric', async () => {
      await expect(
        movieService.getMovieRecommendations('abc', {}),
      ).rejects.toBeInstanceOf(ValidationError);
    });

    it('should return cached recommendations if present', async () => {
      const fakeCache = [
        {
          movieTitle: 'A',
          recommendations: [],
          page: 1,
          total_pages: 1,
          total_results: 1,
        },
      ] as TMDBSearchResponse[];
      (cache as jest.Mock).mockResolvedValue(fakeCache);

      const result = await movieService.getMovieRecommendations('1', {});
      expect(cache).toHaveBeenCalledWith('1');
      expect(result).toEqual(fakeCache);
    });

    it('should throw NotFoundError when no liked movies', async () => {
      (cache as jest.Mock).mockResolvedValue(null);
      reactionRepoMock.getLikedMovies.mockResolvedValue([]);

      await expect(
        movieService.getMovieRecommendations('1', {}),
      ).rejects.toBeInstanceOf(NotFoundError);
    });

    it('should return formatted recommendations with combinedScore', async () => {
      (cache as jest.Mock).mockResolvedValue(null);
      reactionRepoMock.getLikedMovies.mockResolvedValue([
        { movieId: '10', movieTitle: 'X' },
      ]);

      const recommendationData = {
        page: 1,
        results: [
          {
            id: 20,
            vote_average: 8,
            popularity: 10,
            title: 'Movie 1',
            overview: 'Test movie',
            release_date: '2024-01-01',
            poster_path: '/test.jpg',
            genre_ids: [1],
            vote_count: 100,
            media_type: 'movie',
            original_title: 'Movie 1',
          },
        ],
        total_pages: 1,
        total_results: 1,
      };

      (axios.get as jest.Mock).mockResolvedValue({ data: recommendationData });

      const result = await movieService.getMovieRecommendations('1', {});

      expect(result[0].movieTitle).toBe('X');
      expect(result[0].recommendations[0].combinedScore).toBeDefined();
      expect(result[0].recommendations[0].combinedScore).toBeGreaterThan(0);
    });

    it('should throw InternalServerError if fetchFromTMDB fails', async () => {
      (cache as jest.Mock).mockResolvedValue(null);
      reactionRepoMock.getLikedMovies.mockResolvedValue([
        { movieId: '10', movieTitle: 'X' },
      ]);
      (axios.get as jest.Mock).mockRejectedValue(new Error('fail'));

      await expect(
        movieService.getMovieRecommendations('1', {}),
      ).rejects.toBeInstanceOf(InternalServerError);
    });
  });
});
