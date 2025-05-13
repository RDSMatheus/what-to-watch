import { Request, Response } from 'express';
import ReactionService from '../services/reaction.service';

class ReactionController {
  static async createReaction(req: Request, res: Response) {
    await new ReactionService().toggleReaction(req.body);
    res.status(200).json({ message: 'Reação criada' });
  }

  static async getLikedMovies(req: Request, res: Response) {
    const parsedId = Number(req.params.userId);
    const likedMovies = await new ReactionService().getLikedMovies(parsedId);
    res.status(200).json({ message: 'Filmes retornados', likedMovies });
  }

  static async deleteReaction(req: Request, res: Response) {
    const { userId, movieId } = req.params;
    await new ReactionService().deleteReaction(userId, movieId);
    res.status(204).json({});
  }
}

export default ReactionController;
