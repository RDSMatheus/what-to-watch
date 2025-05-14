"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const user_controller_1 = __importDefault(require("../modules/user/controllers/user.controller"));
const auth_middleware_1 = __importDefault(require("../core/middlewares/auth-middleware"));
const userRouter = (0, express_1.Router)();
userRouter.post('/user', 
/*
#swagger.tags = ['User']
#swagger.summary = 'Cria um novo usuário.'
#swagger.parameters['user'] = {
  in: 'body',
  description: 'Dados do usuário',
  required: true,
  schema: { $ref: "#/components/schemas/UserPost" }
}
#swagger.responses[201]= {
  description: 'Usuário criado.',
  schema: {
    message: "Usuário criado com sucesso!"
  },
}
*/
(0, express_async_handler_1.default)(user_controller_1.default.createUser));
userRouter.get('/user/:email', auth_middleware_1.default, 
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
     $ref: "#/components/schemas/UserResponse"
    }
  },
}
*/
(0, express_async_handler_1.default)(user_controller_1.default.getUserByEmail));
userRouter.delete('/user/:id', 
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
(0, express_async_handler_1.default)(user_controller_1.default.deleteUserById));
userRouter.put('/user/:id', auth_middleware_1.default, 
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
        $ref: "#/components/schemas/UserResponse"
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
(0, express_async_handler_1.default)(user_controller_1.default.updateUserById));
exports.default = userRouter;
//# sourceMappingURL=user.routes.js.map