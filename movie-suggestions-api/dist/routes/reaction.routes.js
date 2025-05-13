"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reaction_controller_1 = __importDefault(require("../modules/reaction/controllers/reaction.controller"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const reactionRouter = (0, express_1.Router)();
reactionRouter.post('/reaction', 
/*
#swagger.tags = ['Reaction']
#swagger.summary = 'Cria uma nova reação.'
#swagger.parameters['reaction'] = {
  in: 'body',
  description: 'Dados da reação',
  required: true,
  schema: { $ref: "#/definitions/ReactionPost" }
}
#swagger.responses[200]= {
  description: 'Reação com sucesso.',
  schema: {
    message: "Reagido com sucesso!"
  },
}
*/
(0, express_async_handler_1.default)(reaction_controller_1.default.createReaction));
reactionRouter.get('/reaction/:userId', 
/*
  #swagger.tags = ['Reaction']
  #swagger.summary = 'Lista os filmes curtidos por um usuário.'
  #swagger.parameters['userId'] = {
    in: 'path',
    description: 'ID do usuário',
    required: true,
    type: 'integer'
  }
  #swagger.responses[200] = {
    description: 'Lista de filmes curtidos retornada com sucesso.',
    schema: [
      {
        movieId: 'string',
        movieTitle: 'string'
      }
    ]
  }
  #swagger.responses[400] = {
    description: 'ID do usuário não informado.',
    schema: { message: 'Insira um id.' }
  }
  #swagger.responses[404] = {
    description: 'Nenhum filme curtido encontrado.',
    schema: { message: 'Nenhum filme curtido encontrado.' }
  }
*/
(0, express_async_handler_1.default)(reaction_controller_1.default.getLikedMovies));
reactionRouter.delete('/reaction/:userId/:movieId', 
/*
  #swagger.tags = ['Reaction']
  #swagger.summary = 'Remove reações de múltiplos usuários a múltiplos filmes.'
  #swagger.parameters['ids'] = {
    in: 'path',
    description: 'IDs dos usuários, separados por vírgula',
    required: true,
    type: 'string'
  }
  #swagger.parameters['movieIds'] = {
    in: 'path',
    description: 'IDs dos filmes, separados por vírgula',
    required: true,
    type: 'string'
  }
  #swagger.responses[200] = {
    description: 'Reações removidas com sucesso.',
    schema: { message: 'Reações removidas com sucesso.' }
  }
  #swagger.responses[400] = {
    description: 'IDs inválidos.',
    schema: { message: 'IDs inválidos.' }
  }
*/
(0, express_async_handler_1.default)(reaction_controller_1.default.deleteReaction));
exports.default = reactionRouter;
//# sourceMappingURL=reaction.routes.js.map