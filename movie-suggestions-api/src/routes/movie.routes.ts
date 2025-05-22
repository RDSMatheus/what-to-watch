import { Router } from "express";
import asyncHandler from "express-async-handler";
import MovieController from "../modules/movie/controllers/movie.controller";

const movieRouter = Router();

movieRouter.get(
  "/movie/search/:name",
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

  asyncHandler(MovieController.getMovieByName)
);

movieRouter.get(
  "/movie/user/:userId/recommendations",
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
  asyncHandler(MovieController.getMovieRecommendations)
);

movieRouter.get(
  "/movie/trending",
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
  asyncHandler(MovieController.getTrendingMovies)
);
movieRouter.get(
  "/movie/upcoming",
  /*
    #swagger.tags = ['Movie']
    #swagger.summary = 'Lista filmes em lançamento.'
    #swagger.parameters['page'] = {
      in: 'query',
      description: 'Número da página dos lançamentos',
      required: false,
      type: 'integer',
      default: 1
    }
    #swagger.responses[200] = {
      description: 'Filmes em lançamento resgatados.',
      schema: {
        message: 'Filmes em lançamento resgatados',
        upcoming: { $ref: '#/components/schemas/TMDBUpcomingResponse' }
      }
    }
    #swagger.responses[500] = {
      description: 'Erro interno do servidor.',
      schema: { message: 'Erro interno do servidor' }
    }
  */
  asyncHandler(MovieController.getUpcomingMovies)
);

movieRouter.get(
  "/movie/details/:movieId",
  /*
    #swagger.tags = ['Movie']
    #swagger.summary = 'Detalhes completos de um filme, incluindo elenco.'
    #swagger.parameters['movieId'] = {
      in: 'path',
      description: 'ID do filme',
      required: true,
      type: 'integer'
    }
    #swagger.responses[200] = {
      description: 'Detalhes do filme retornados com sucesso.',
      schema: {
        message: 'Detalhes do filmes retornados com sucesso.',
        movieDetails: { $ref: '#/components/schemas/TMDBMovieDetails' }
      }
    }
    #swagger.responses[400] = {
      description: 'ID do filme inválido.',
      schema: { message: 'Insira um movieId válido' }
    }
    #swagger.responses[500] = {
      description: 'Erro interno do servidor.',
      schema: { message: 'Erro interno do servidor' }
    }
  */
  asyncHandler(MovieController.getMovieDetails)
);
movieRouter.get(
  "/movie/genre",
  /*
    #swagger.tags = ['Movie']
    #swagger.summary = 'Busca filmes por gênero, nota e página.'
    #swagger.parameters['genre'] = {
      in: 'query',
      description: 'ID do gênero do filme (opcional)',
      required: false,
      type: 'string'
      default: '28'
    }
    #swagger.parameters['vote_average'] = {
      in: 'query',
      description: 'Nota do filme (opcional)',
      required: false,
      type: 'string'
    }
    #swagger.parameters['page'] = {
      in: 'query',
      description: 'Número da página dos resultados (opcional)',
      required: false,
      type: 'string',
      default: '1'
    }
    #swagger.responses[200] = {
      description: 'Filmes retornados com sucesso.',
      schema: {
        message: 'Filmes retornados com sucesso',
        movies: { $ref: '#/components/schemas/TMDBSearch' }
      }
    }
    #swagger.responses[500] = {
      description: 'Erro interno do servidor.',
      schema: { message: 'Erro interno do servidor' }
    }
  */
  asyncHandler(MovieController.getMovieByGenre)
);

export default movieRouter;
