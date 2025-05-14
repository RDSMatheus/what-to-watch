import { Request, Response } from 'express';
import MovieService from '../services/movie.service';

class MovieController {
  static async getMovieByName(req: Request, res: Response) {
    const { name } = req.params;

    const movie = await new MovieService().getMovieByName(name);

    res.status(200).json({ message: 'Filme encontrado', movie });
  }

  static async getMovieRecommendations(req: Request, res: Response) {
    const { userId } = req.params;
    const pages = (req.query.pages as Record<string, string>) || {};
   
    const recommendations = await new MovieService().getMovieRecommendations(
      userId,
      pages,
    );

    res.status(200).json({ message: 'Sugestões de filmes', recommendations });
  }

  static async getTrendingMovies(req: Request, res: Response) {
    const trending = await new MovieService().getTrendingMovies();

    res.status(200).json({ message: 'Filmes que estão em trending', trending });
  }
}

export default MovieController;
