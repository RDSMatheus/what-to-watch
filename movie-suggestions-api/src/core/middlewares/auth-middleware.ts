import { NextFunction, Request, Response } from 'express';
import { ValidationError } from '../errors/validation.error';
import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import { ENV } from '../../config/env';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const auth = req.headers.authorization;
  if (!auth) throw new ValidationError('Token de autorização necessário');
  try {
    const token = auth.split(' ')[1];

    const validToken = jwt.verify(token, ENV.AUTH_SECRET);
    console.log(validToken);
    if (!validToken) throw new ValidationError('Token inválido');

    next();
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      res.status(401).json({ message: 'Token inválido!' });
      return;
    } else {
      res.status(500).json({ message: 'Erro interno no servidor!' });
      return;
    }
  }
};
export default authMiddleware;
