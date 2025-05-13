import { Router } from 'express';
import ReactionController from '../modules/reaction/controllers/reaction.controller';
import asyncHandler from 'express-async-handler';

const reactionRouter = Router();

reactionRouter.post(
  '/reaction',
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
  asyncHandler(ReactionController.createReaction),
);
reactionRouter.get(
  '/reaction/:userId',
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
  asyncHandler(ReactionController.getLikedMovies),
);
reactionRouter.delete(
  '/reaction/:userId/:movieId',
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
  asyncHandler(ReactionController.deleteReaction),
);

export default reactionRouter;
