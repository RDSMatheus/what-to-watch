import { Prisma, User } from '../../../../prisma/app/generated/prisma/client';
import bcrypt from 'bcrypt';
import { ValidationError } from '../../../core/errors/validation.error';
import { CreateUserDto, UserDto } from '../dto/create-user.dto';
import UserRepository from '../repository/user.repository';
import { NotFoundError } from '../../../core/errors/not-found.error';
import { UserReponse } from '../dto/user-response.dto';
import { ErrorBase } from '../../../core/errors/base.error';
import { ENV } from '../../../config/env';
import { UpdateUser } from '../dto/update-user.dto';
import { InternalServerError } from '../../../core/errors/internal-server.error';
import { userEvents } from '../../../core/events/user.events';

class UserService {
  private userRepository: UserRepository;

  constructor(userRepository?: UserRepository) {
    this.userRepository = userRepository ?? new UserRepository();
  }

  async createUser(user: CreateUserDto): Promise<void> {
    try {
      const parsedUser = UserDto.safeParse(user);

      if (!parsedUser.success) {
        throw new ValidationError(parsedUser.error.errors[0].message);
      }

      const hashedPassword = await bcrypt.hash(
        parsedUser.data.password,
        ENV.SALT_ROUNDS,
      );

      const newUser: CreateUserDto = {
        ...parsedUser.data,
        password: hashedPassword,
      };

      const createdUser = await this.userRepository.createUser(newUser);

      userEvents.emit('userCreated', createdUser);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002')
          throw new ValidationError('Email já está em uso');

        throw new ValidationError(`Erro no de dados: ${error.message}`);
      }

      throw error;
    }
  }

  async getUserByEmail(email: string): Promise<UserReponse> {
    try {
      const user = await this.userRepository.getUserByEmail(email);

      if (!user) throw new NotFoundError('Usuário não encontrado!');

      const safeUser: UserReponse = {
        id: user.id,
        email: user.email,
        name: user.name,
        verified: user.verified,
      };

      return safeUser;
    } catch (error) {
      if (error instanceof ErrorBase) throw new NotFoundError(error.message);
      throw error;
    }
  }

  async deleteUserById(userId: string): Promise<void> {
    if (!userId) throw new ValidationError('Insira um id válido');

    const id = Number(userId);

    try {
      const user = await this.userRepository.getUserById(id);

      if (!user) throw new NotFoundError('Usuário não encontrado');

      await this.userRepository.deleteUserById(id);
    } catch (error) {
      if (error instanceof ErrorBase) throw new NotFoundError(error.message);
      throw error;
    }
  }

  async updateUserById(userId: string, body: UpdateUser): Promise<User> {
    if (!userId) throw new ValidationError('Insira um id válido');

    const id = Number(userId);
    try {
      const existUser = await this.userRepository.getUserById(id);

      if (!existUser) throw new NotFoundError('Usuário não encontrado.');

      let hashedPassword = '';

      if (body.password)
        hashedPassword = await bcrypt.hash(body.password, ENV.SALT_ROUNDS);

      const newPassword = body.password ? hashedPassword : existUser.password;

      const updateUser: UpdateUser = {
        email: body.email ? body.email : existUser.email,
        name: body.name ? body.name : existUser.name,
        password: newPassword,
      };

      const updatedUser = await this.userRepository.updateUserById(
        id,
        updateUser,
      );

      return updatedUser;
    } catch (error) {
      if (error instanceof ErrorBase) throw error;
      throw new InternalServerError();
    }
  }

  async verifyEmail(userId: string): Promise<void> {
    try {
      if (!userId) throw new ValidationError('Insira um id');

      const id = Number(userId);

      const existingUser = await this.userRepository.getUserById(id);

      if (!existingUser) throw new NotFoundError('Usuário não encontrado');

      if (existingUser.verified)
        throw new ValidationError('Usuário já verificado!');

      await this.userRepository.verifyEmail(id);
    } catch (error) {
      if (error instanceof ErrorBase) throw error;
      throw new InternalServerError();
    }
  }

  async resetPassword(email: string, password: string): Promise<void> {
    try {
      if (!email) throw new ValidationError('Insira um email.');

      if (!password) throw new ValidationError('Insira uma senha.');

      if (password.length > 6)
        throw new ValidationError('A senha deve ter pelo menos 6 dígitos.');

      const hashedPassword = await bcrypt.hash(password, ENV.SALT_ROUNDS);

      await this.userRepository.resetPassword(email, hashedPassword);
    } catch (error) {
      if (error instanceof ErrorBase) throw error;
      throw new InternalServerError();
    }
  }
}

export default UserService;
