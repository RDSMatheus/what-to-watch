import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import MovieController from '../modules/movie/controllers/movie.controller';

const movieRouter = Router();

movieRouter.get(
  '/movie/search/:name',
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
          { $ref: '#/components/schemas/TMDBmovieScore' }
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

  asyncHandler(MovieController.getMovieByName),
);

movieRouter.get(
  '/movie/user/:userId/recommendations',
  /*
    #swagger.tags = ['Movie']
    #swagger.summary = 'Recomendações de filmes para o usuário.'
    #swagger.parameters['userId'] = {
      in: 'path',
      description: 'ID do usuário',
      required: true,
      type: 'integer'
    }
    #swagger.parameters['pages'] = {
      in: 'query',
      name: 'pages',
      style: 'deepObject',
      explode: true,
      allowReserved: true,
      description: 'Mapeamento dinâmico movieId→página. Exemplo de uso: ?pages[550]=2&pages[278]=1',
      schema: {
        "550":"2"
      }
    }
    #swagger.responses[200] = {
      description: 'Recomendações retornadas.',
      schema: [
        {
          movieTitle: 'string',
          recommendations: [
            { $ref: '#/components/schemas/TMDBmovieScore' }
          ],
          page: 1,
          total_pages: 10,
          total_results: 100
        }
      ]
    }
    #swagger.responses[404] = {
      description: 'Não há filmes para se basear recomendações',
      schema: { message: 'Não há filmes para se basear recomendações' }
    }
  */
  asyncHandler(MovieController.getMovieRecommendations),
);

movieRouter.get(
  '/movie/trending',
  /*
    #swagger.tags = ['Movie']
    #swagger.summary = 'Busca um filmes que estão em trend.'
    #swagger.responses[200] = {
      description: 'Filmes encontrados.',
      schema: {
        message: 'Filmes que estão em trending.',
        movies: [
          { $ref: '#/components/schemas/TMDBSearch' }
        ]
      }
    }
    #swagger.responses[500] = {
      description: 'Erro interno do servidor.',
      schema: { message: 'Erro interno do servidor' }
    }
    
  */
  asyncHandler(MovieController.getTrendingMovies),
);

export default movieRouter;
