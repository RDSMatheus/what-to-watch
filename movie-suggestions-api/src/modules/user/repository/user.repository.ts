import { Prisma, User } from '../../../../prisma/app/generated/prisma/client';
import prisma from '../../../infra/prisma/client';
import { UpdateUser } from '../dto/update-user.dto';

class UserRepository {
  async createUser(body: Prisma.UserCreateInput): Promise<User> {
    const user = await prisma.user.create({
      data: body,
    });

    return user;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { email: email } });
    return user;
  }

  async deleteUserById(id: number): Promise<void> {
    await prisma.user.delete({
      where: {
        id,
      },
    });
  }

  async getUserById(id: number): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { id } });
    return user;
  }

  async updateUserById(id: number, body: UpdateUser): Promise<User> {
    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        ...body,
      },
    });
    return user;
  }

  async verifyEmail(id: number): Promise<void> {
    await prisma.user.update({
      where: { id },
      data: { verified: true },
    });
  }

  async resetPassword(email: string, password: string): Promise<void> {
    await prisma.user.update({
      where: { email },
      data: {
        password,
      },
    });
  }
}

export default UserRepository;
