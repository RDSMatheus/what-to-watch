import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import UserController from '../modules/user/controllers/user.controller';
import authMiddleware from '../core/middlewares/auth-middleware';

const userRouter = Router();

userRouter.post(
  '/user',
  /*
  #swagger.tags = ['User']
  #swagger.summary = 'Cria um novo usuário.'
  #swagger.parameters['user'] = {
    in: 'body',
    description: 'Dados do usuário',
    required: true,
    schema: { $ref: "#/definitions/UserPost" }
  }
  #swagger.responses[201]= {
    description: 'Usuário criado.', 
    schema: {
      message: "Usuário criado com sucesso!"
    },
  }
  */
  asyncHandler(UserController.createUser),
);
userRouter.get(
  '/user/:email',
  authMiddleware,
  /*
  #swagger.tags = ['User']
  #swagger.summary = 'Retorna um usuário via email.'
  #swagger.parameters['email'] = {
    in: 'params',
    description: 'Dados do usuário',
    required: true,
  }
  #swagger.security = [{
    bearerAuth: []
  }]
  #swagger.responses[200]= {
    description: 'Usuário retornado.', 
    schema: {
      message: "Usuário criado com sucesso!",
      user: {
       $ref: "#/definitions/UserResponse" 
      }
    },
  }
  */
  asyncHandler(UserController.getUserByEmail),
);
userRouter.delete(
  '/user/:id',
  /*
  #swagger.tags = ['User']
  #swagger.summary = 'Deleta um usuário via id.'
  #swagger.parameters['id'] = {
    in: 'params',
    description: 'Id do usuário',
    required: true,
  }
  #swagger.security = [{
    bearerAuth: []
  }]
  #swagger.responses[204]= {
    description: 'Usuário deletado.', 
   
  }
  */
  asyncHandler(UserController.deleteUserById),
);
userRouter.put(
  '/user/:id',
  authMiddleware,
  /*
    #swagger.tags = ['User']
    #swagger.summary = 'Atualiza um usuário pelo ID'
    #swagger.description = 'Atualiza os dados de um usuário existente'
    #swagger.security = [{
      bearerAuth: []
    }]
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'ID do usuário',
      required: true,
      type: 'integer'
    }
    #swagger.parameters['user'] = {
      in: 'body',
      description: 'Dados do usuário para atualizar',
      required: true,
      schema: {
        name: 'string',
        email: 'string@email.com',
        password: 'string'
      }
    }
    #swagger.responses[200] = {
      description: 'Usuário atualizado com sucesso',
      schema: {
        message: "Usuário atualizado com sucesso",
        user: {
          $ref: "#/definitions/UserResponse"
        }
      }
    }
    #swagger.responses[400] = {
      description: 'Dados inválidos',
      schema: { message: "Dados inválidos" }
    }
    #swagger.responses[404] = {
      description: 'Usuário não encontrado',
      schema: { message: "Usuário não encontrado" }
    }
  */
  asyncHandler(UserController.updateUserById),
);

export default userRouter;
