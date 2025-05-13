import { z } from 'zod';

const ReactionEnum = z.enum(['LIKE', 'DISLIKE']);

export const ReactionDto = z.object({
  userId: z
    .number({
      required_error: 'O campo userId é obrigatório.',
      invalid_type_error: 'ID do usuário deve ser um número',
    })
    .min(1, { message: 'Insira o ID do usuário' }),

  movieId: z
    .string({
      required_error: 'O campo movieId é obrigatório.',
      invalid_type_error: 'ID do filme deve ser uma string',
    })
    .min(1, { message: 'Insira o ID do filme' }),

  type: ReactionEnum,
  movieTitle: z
    .string({
      required_error: 'O campo movieId é obrigatório.',
      invalid_type_error: 'O titulo do filme deve ser uma string',
    })
    .min(1, { message: 'Insira o titulo do filme' }),
});

export type CreateReactionDto = z.infer<typeof ReactionDto>;
