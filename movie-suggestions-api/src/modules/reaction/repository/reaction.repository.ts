import { Prisma } from '../../../../prisma/app/generated/prisma/client';
import prisma from '../../../infra/prisma/client';
import { CreateReactionDto } from '../dto/create-reaction.dto';
import { ReactionResponse } from '../dto/reaction-response.dto';

class ReactionRepository {
  async createReaction(body: CreateReactionDto): Promise<void> {
    const reaction: Prisma.ReactionCreateInput = {
      type: body.type,
      movieId: body.movieId,
      user: { connect: { id: body.userId } },
      movieTitle: body.movieTitle,
    };

    await prisma.reaction.create({ data: reaction });
  }

  async findReaction(
    userId: number,
    movieId: string,
  ): Promise<ReactionResponse | null> {
    const reaction = await prisma.reaction.findFirst({
      where: {
        userId,
        movieId,
      },
    });
    return reaction;
  }

  async getLikedMovies(
    userId: number,
  ): Promise<{ movieId: string; movieTitle: string }[]> {
    const reactions = await prisma.reaction.findMany({
      where: { userId, type: 'LIKE' },
      select: { movieId: true, movieTitle: true },
    });

    return reactions;
  }

  async deleteReaction(
    userId: number,
    movieId: string,
  ): Promise<Prisma.BatchPayload> {
    const deleted = await prisma.reaction.deleteMany({
      where: { userId, movieId },
    });
    return deleted;
  }

  async updateReaction(body: CreateReactionDto): Promise<void> {
    const { movieId, type, userId } = body;
    await prisma.reaction.update({
      where: { userId_movieId: { userId, movieId } },
      data: { type },
    });
  }
}

export default ReactionRepository;
