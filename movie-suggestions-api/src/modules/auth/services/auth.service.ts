import jwt, { JsonWebTokenError, JwtPayload } from 'jsonwebtoken';
import UserRepository from '../../user/repository/user.repository';
import { NotFoundError } from '../../../core/errors/not-found.error';
import bcrypt from 'bcrypt';
import { ValidationError } from '../../../core/errors/validation.error';
import { ErrorBase } from '../../../core/errors/base.error';
import { ENV } from '../../../config/env';
import { InternalServerError } from '../../../core/errors/internal-server.error';
import { User } from '../../../../prisma/app/generated/prisma/client';
import { mailSend } from '../../../core/utils/nodemailer';
import UserService from './../../user/services/user.service';

class AuthService {
  userService: UserService;
  constructor(userService?: UserService) {
    this.userService = userService ?? new UserService();
  }
  async login(email: string, password: string): Promise<string> {
    try {
      if (!email) throw new ValidationError('Insira um email!');

      const user = await new UserRepository().getUserByEmail(email);

      if (!user) throw new NotFoundError('Email inválido!');

      const comparedPassword = await bcrypt.compare(password, user.password);

      if (!comparedPassword) throw new ValidationError('Senha inválida!');

      const token = await this.tokenGenerate(user.email, user.id);

      return token;
    } catch (error) {
      if (error instanceof ErrorBase) throw error;
      throw new InternalServerError();
    }
  }

  async register(user: User): Promise<void> {
    const token = await this.tokenGenerate(user.email, user.id);
    const verificationUrl = `${ENV.APP_URL}/auth/verify-email?token=${token}`;

    await mailSend({
      email: user.email,
      subject: 'Verifique seu e-mail',
      html: `<h1>Olá, ${user.name}</h1>
      <p>Clique <a href="${verificationUrl}">aqui</a> para verificar seu e-mail.</p>`,
    });
  }

  async verifyEmail(token: string): Promise<void> {
    try {
      const payload = jwt.verify(token, ENV.AUTH_SECRET) as JwtPayload;
      this.userService.verifyEmail(payload.id);
    } catch (error) {
      if (error instanceof JsonWebTokenError)
        throw new ValidationError('Token inválido.');
      throw new InternalServerError();
    }
  }

  async sendRecoverEmail(email: string): Promise<void> {
    try {
      if (!email) throw new ValidationError('Insira um email!');

      const user = await new UserRepository().getUserByEmail(email);

      if (!user) throw new NotFoundError('Email inválido!');

      const token = await this.tokenGenerate(user.email, user.id);

      const verificationUrl = `${ENV.APP_URL}/auth/redefine-password?token=${token}`;

      await mailSend({
        email: user.email,
        subject: 'Recuperação de senha',
        html: `<h1>Olá, ${user.name}</h1>
        <p>Clique <a href="${verificationUrl}">aqui</a> para redefinir sua senha.</p>
        <p>Esse link expira em 1 hora.</p>
        `,
      });
    } catch (error) {
      if (error instanceof ErrorBase) throw error;
      throw new InternalServerError();
    }
  }

  async resetPassword(email: string, password: string) {
    try {
      if (!email) throw new ValidationError('Insira um email válido.');
      if (password.length < 6)
        throw new ValidationError('A senha deve conter 6 digitos.');
      await this.userService.resetPassword(email, password);
    } catch (error) {
      if (error instanceof ErrorBase) throw error;
      throw new InternalServerError();
    }
  }

  private async tokenGenerate(email: string, id: number): Promise<string> {
    const token = jwt.sign({ email, id }, ENV.AUTH_SECRET, {
      expiresIn: '1h',
    });
    return token;
  }
}

export default AuthService;
