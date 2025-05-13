import { $Enums } from '../../../../prisma/app/generated/prisma/client';

export interface ReactionResponse {
  id: number;
  movieId: string;
  movieTitle: string;
  type: $Enums.ReactionType;
  createdAt: Date;
  userId: number;
}
