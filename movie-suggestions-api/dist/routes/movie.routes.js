"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const movie_controller_1 = __importDefault(require("../modules/movie/controllers/movie.controller"));
const movieRouter = (0, express_1.Router)();
movieRouter.get('/movie/search/:name', 
/*
  #swagger.tags = ['Movie']
  #swagger.summary = 'Busca um filme pelo nome.'
  #swagger.parameters['name'] = {
    in: 'path',
    description: 'Nome do filme',
    required: true,
    type: 'string'
  }
  #swagger.responses[200] = {
    description: 'Filme(s) encontrado(s).',
    schema: {
      message: 'Filme encontrado',
      movies: [
        { $ref: '#/definitions/TMDBmovieScore' }
      ]
    }
  }
  #swagger.responses[400] = {
    description: 'Nome do filme não informado.',
    schema: { message: 'Insira o nome de um filme' }
  }
  #swagger.responses[404] = {
    description: 'Filme não encontrado.',
    schema: { message: 'Filme não encontrado.' }
  }
*/
(0, express_async_handler_1.default)(movie_controller_1.default.getMovieByName));
movieRouter.get('/movie/user/:userId', 
/*
  #swagger.tags = ['Movie']
  #swagger.summary = 'Recomendações de filmes para o usuário.'
  #swagger.parameters['userId'] = {
    in: 'path',
    description: 'ID do usuário',
    required: true,
    type: 'integer'
  }
  #swagger.responses[200] = {
    description: 'Recomendações retornadas.',
    schema: [
      {
        movieTitle: 'string',
        recommendations: [
          { $ref: '#/definitions/TMDBmovieScore' }
        ]
      }
    ]
  }
  #swagger.responses[404] = {
    description: 'Não há filmes para se basear recomendações',
    schema: { message: 'Não há filmes para se basear recomendações' }
  }
*/
(0, express_async_handler_1.default)(movie_controller_1.default.getMovieRecommendations));
movieRouter.get('/movie/trending', 
/*
  #swagger.tags = ['Movie']
  #swagger.summary = 'Busca um filmes que estão em trend.'
  #swagger.responses[200] = {
    description: 'Filmes encontrados.',
    schema: {
      message: 'Filmes que estão em trending.',
      movies: [
        { $ref: '#/definitions/TMDBSearch' }
      ]
    }
  }
  #swagger.responses[500] = {
    description: 'Erro interno do servidor.',
    schema: { message: 'Erro interno do servidor' }
  }
  
*/
(0, express_async_handler_1.default)(movie_controller_1.default.getTrendingMovies));
exports.default = movieRouter;
//# sourceMappingURL=movie.routes.js.map