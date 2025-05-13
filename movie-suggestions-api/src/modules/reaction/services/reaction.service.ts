import { ErrorBase } from '../../../core/errors/base.error';
import { InternalServerError } from '../../../core/errors/internal-server.error';
import { NotFoundError } from '../../../core/errors/not-found.error';
import { ValidationError } from '../../../core/errors/validation.error';
import { CreateReactionDto, ReactionDto } from '../dto/create-reaction.dto';
import ReactionRepository from '../repository/reaction.repository';

class ReactionService {
  reactionRepository: ReactionRepository;
  constructor(reactionRepository?: ReactionRepository) {
    this.reactionRepository = reactionRepository ?? new ReactionRepository();
  }

  async toggleReaction(body: CreateReactionDto): Promise<void> {
    try {
      const parsedReaction = ReactionDto.safeParse(body);
      if (!parsedReaction.success) {
        throw new ValidationError(parsedReaction.error.errors[0].message);
      }

      const { userId, movieId, type } = parsedReaction.data;

      const existing = await this.reactionRepository.findReaction(
        userId,
        movieId,
      );

      if (!existing)
        return await this.reactionRepository.createReaction(
          parsedReaction.data,
        );

      if (existing.type === type) {
        await this.reactionRepository.deleteReaction(userId, movieId);
        return;
      }

      return this.reactionRepository.updateReaction(parsedReaction.data);
    } catch (error) {
      if (error instanceof ValidationError) {
        throw new ValidationError(error.message);
      } else throw new InternalServerError();
    }
  }

  async getLikedMovies(
    userId: number,
  ): Promise<{ movieId: string; movieTitle: string }[]> {
    try {
      if (!userId) throw new ValidationError('Insira um id.');

      const likedMovies = await this.reactionRepository.getLikedMovies(userId);

      return likedMovies;
    } catch (error) {
      if (error instanceof ValidationError) {
        throw new ValidationError(error.message);
      } else throw new InternalServerError();
    }
  }

  async deleteReaction(userId: string, movieId: string) {
    const id = Number(userId);
    try {
      const deleted = await this.reactionRepository.deleteReaction(id, movieId);
      if (!deleted.count) throw new NotFoundError('Reação não encontrada');
    } catch (error) {
      if (error instanceof ErrorBase) throw error;
      throw new InternalServerError();
    }
  }
}

export default ReactionService;
