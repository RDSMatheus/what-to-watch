import { Request, Response } from "express";
import MovieService from "../services/movie.service";

class MovieController {
  static async getMovieByName(req: Request, res: Response) {
    const { name } = req.params;

    const movie = await new MovieService().getMovieByName(name);

    res.status(200).json({ message: "Filme encontrado", movie });
  }

  static async getMovieRecommendations(req: Request, res: Response) {
    const { userId } = req.params;
    const pages = (req.query.pages as Record<string, string>) || {};

    const recommendations = await new MovieService().getMovieRecommendations(
      userId,
      pages
    );

    res.status(200).json({ message: "Sugestões de filmes", recommendations });
  }

  static async getUpcomingMovies(req: Request, res: Response) {
    const { page } = req.query;

    const upcoming = await new MovieService().getUpcomingMovies(String(page));

    res
      .status(200)
      .json({ message: "Filmes em lançamento resgatados", upcoming });
  }

  static async getMovieDetails(req: Request, res: Response) {
    const { movieId } = req.params;

    const movieDetails = await new MovieService().getMovieDetails(movieId);

    res.status(200).json({
      message: "Detalhes do filmes retornados com sucesso.",
      movieDetails,
    });
  }

  static async getMovieByGenre(req: Request, res: Response) {
    const { vote_average, page, genre } = req.params;

    const movies = await new MovieService().getMovieByGenre({
      vote_average,
      page,
      genre,
    });

    res.status(200).json({ message: "Filmes retornados com sucesso", movies });
  }

  static async getTrendingMovies(req: Request, res: Response) {
    const trending = await new MovieService().getTrendingMovies();

    res.status(200).json({ message: "Filmes que estão em trending", trending });
  }
}

export default MovieController;
