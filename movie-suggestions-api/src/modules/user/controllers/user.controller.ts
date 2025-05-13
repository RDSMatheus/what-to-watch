import { Request, Response } from 'express';
import UserService from '../services/user.service';

class UserController {
  static async createUser(req: Request, res: Response) {
    await new UserService().createUser(req.body);
    res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
  }

  static async getUserByEmail(req: Request, res: Response) {
    const { email } = req.params;
    const user = await new UserService().getUserByEmail(email);
    res.status(200).json({ message: 'Usuário encontrado com sucesso!', user });
  }

  static async deleteUserById(req: Request, res: Response) {
    const { id } = req.params;
    await new UserService().deleteUserById(id);
    res.status(204).json({ message: 'Usuário deletado com sucesso!' });
  }

  static async updateUserById(req: Request, res: Response) {
    const { id } = req.params;
    const { body } = req;

    const updatedUser = await new UserService().updateUserById(id, body);
    res
      .status(200)
      .json({ message: 'Usuário atualizado com sucesso!', updatedUser });
  }
}

export default UserController;
