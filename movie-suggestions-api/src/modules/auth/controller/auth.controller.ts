import { Request, Response } from 'express';
import AuthService from '../services/auth.service';

class AuthController {
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const token = await new AuthService().login(email, password);
    res.status(200).json({ message: 'Token retornado com sucesso!', token });
  }

  static async verifyEmail(req: Request, res: Response) {
    const { token } = req.query;
    await new AuthService().verifyEmail(String(token));
    res.status(200).json({ message: 'Usuário verificado com sucesso!' });
  }

  static async sendRecoverEmail(req: Request, res: Response) {
    const { email } = req.body;
    await new AuthService().sendRecoverEmail(email);
    res.status(200).json({ message: 'Email de recuperação!' });
  }

  static async resetPassword(req: Request, res: Response) {
    const { email, password } = req.body;
    await new AuthService().resetPassword(email, password);
    res.status(200).json({ message: 'Email de recuperação!' });
  }
}

export default AuthController;
