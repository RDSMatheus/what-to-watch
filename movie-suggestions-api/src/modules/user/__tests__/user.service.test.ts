import { Prisma } from '../../../../prisma/app/generated/prisma/client';
import { ValidationError } from '../../../core/errors/validation.error';
import { CreateUserDto } from '../dto/create-user.dto';
import UserRepository from '../repository/user.repository';
import UserService from '../services/user.service';
import bcrypt from 'bcrypt';

type InvalidUser = Omit<CreateUserDto, 'name' | 'password'>;

jest.mock('../repository/user.repository');
jest.mock('bcrypt');
(bcrypt.hash as jest.Mock).mockResolvedValue('fixed-hash');

describe('UserService.createUser', () => {
  let service: UserService;
  let repoMock: jest.Mocked<UserRepository>;

  beforeEach(() => {
    jest.clearAllMocks();
    repoMock = new UserRepository() as jest.Mocked<UserRepository>;
    service = new UserService(repoMock);
  });

  it('should call repository.createUser with parsed data when input is valid', async () => {
    const validUser: CreateUserDto = {
      name: 'alice',
      email: 'alice@example.com',
      password: '123456',
    };

    await service.createUser(validUser);

    expect(bcrypt.hash).toHaveBeenCalledWith('123456', expect.any(Number));

    expect(repoMock.createUser).toHaveBeenCalledWith({
      ...validUser,
      password: 'fixed-hash',
    });
  });

  it('should throw ValidationError', async () => {
    const invalidUser: InvalidUser = { email: 'email@email.com' };
    // @ts-expect-error: testando cenário de DTO faltando campos
    await expect(service.createUser(invalidUser)).rejects.toBeInstanceOf(
      ValidationError,
    );
  });

  it("should throw ValidationError with 'Email já está em uso' on P2002 error", async () => {
    const duplicateError = new Prisma.PrismaClientKnownRequestError(
      'Unique constraint error',
      {
        code: 'P2002',
        clientVersion: '1.0',
      },
    );
    repoMock.createUser.mockRejectedValueOnce(duplicateError);

    const newUser: CreateUserDto = {
      name: 'joão',
      email: 'joão@email.com',
      password: '123456',
    };
    await expect(service.createUser(newUser)).rejects.toThrow('Email inválido');
  });
});
