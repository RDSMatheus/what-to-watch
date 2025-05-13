import { z } from 'zod';

export const UserDto = z.object({
  email: z.string().email({ message: 'Email inválido' }).trim().toLowerCase(),
  name: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, { message: 'Nome é obrigatório' }),
  password: z
    .string()
    .min(6, { message: 'A senha deve ter pelo menos 6 digitos' }),
});

export type CreateUserDto = z.infer<typeof UserDto>;

