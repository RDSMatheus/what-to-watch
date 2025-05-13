"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = __importDefault(require("../modules/auth/controller/auth.controller"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const auth_middleware_1 = __importDefault(require("../core/middlewares/auth-middleware"));
const authRouter = (0, express_1.Router)();
authRouter.post('/auth/login', 
/*
  #swagger.tags = ['Auth']
  #swagger.summary = 'Login do usuário'
  #swagger.description = 'Endpoint para autenticar usuário e gerar token JWT'
  #swagger.parameters['body'] = {
    in: 'body',
    description: 'Dados de login',
    required: true,
    schema: {
      email: "user@example.com",
      password: "123456"
    }
  }
  #swagger.responses[200] = {
    description: 'Login realizado com sucesso',
    schema: {
      message: "Token retornado com sucesso!",
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
  }
  #swagger.responses[400] = {
    description: 'Dados inválidos',
    schema: { message: "Email/senha inválidos" }
  }
*/
(0, express_async_handler_1.default)(auth_controller_1.default.login));
authRouter.get('/auth/verify-email', 
/*
  #swagger.tags = ['Auth']
  #swagger.summary = 'Verifica email do usuário'
  #swagger.description = 'Endpoint para verificar email através do token enviado'
  #swagger.parameters['token'] = {
    in: 'query',
    description: 'Token de verificação',
    required: true,
    type: 'string'
  }
  #swagger.responses[200] = {
    description: 'Email verificado com sucesso',
    schema: { message: "Usuário verificado com sucesso!" }
  }
  #swagger.responses[400] = {
    description: 'Token inválido',
    schema: { message: "Token inválido" }
  }
*/
(0, express_async_handler_1.default)(auth_controller_1.default.verifyEmail));
authRouter.post('/auth/recover-password', 
/*
  #swagger.tags = ['Auth']
  #swagger.summary = 'Solicita recuperação de senha'
  #swagger.description = 'Envia email com link para recuperação de senha'
  #swagger.parameters['body'] = {
    in: 'body',
    description: 'Email do usuário',
    required: true,
    schema: { email: "user@example.com" }
  }
  #swagger.responses[200] = {
    description: 'Email enviado com sucesso',
    schema: { message: "Email de recuperação!" }
  }
  #swagger.responses[404] = {
    description: 'Email não encontrado',
    schema: { message: "Email inválido" }
  }
*/
(0, express_async_handler_1.default)(auth_controller_1.default.sendRecoverEmail));
authRouter.post('/auth/redefine-password', 
/*
  #swagger.tags = ['Auth']
  #swagger.summary = 'Redefine senha do usuário'
  #swagger.description = 'Endpoint para redefinir senha (requer autenticação)'
  #swagger.security = [{ "bearerAuth": [] }]
  #swagger.parameters['body'] = {
    in: 'body',
    description: 'Nova senha',
    required: true,
    schema: {
      email: "user@example.com",
      password: "123456"
    }
  }
  #swagger.responses[200] = {
    description: 'Senha alterada com sucesso',
    schema: { message: "Senha redefinida com sucesso!" }
  }
  #swagger.responses[401] = {
    description: 'Não autorizado',
    schema: { message: "Token inválido!" }
  }
*/
auth_middleware_1.default, (0, express_async_handler_1.default)(auth_controller_1.default.resetPassword));
exports.default = authRouter;
//# sourceMappingURL=auth.routes.js.map