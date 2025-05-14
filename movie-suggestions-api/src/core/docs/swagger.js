// eslint-disable-next-line @typescript-eslint/no-require-imports
const swaggerAutogen = require('swagger-autogen')({
  openapi: '3.0.0',
});

const doc = {
  info: {
    title: 'movie-suggestions-api Api',
    description: 'Documentação da api movie-suggestions-api Api.',
  },
  servers: [
    { url: `${process.env.SWAGGER_URL || 'http://localhost:3000'}` }
  ],
  openapi: '3.0.0',
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Insira o token no formato **Bearer <token>**',
      },
    },
    schemas: {
      UserPost: {
        name: 'string',
        email: 'string@email.com',
        password: 'string',
      },
      UserResponse: {
        id: 'number',
        name: 'string',
        email: 'string@email.com',
      },
      AuthResponse: {
        message: 'string',
        token: 'string',
      },
      ReactionPost: {
        movieId: 'string',
        userId: 'number',
        type: { '@enum': ['LIKE', 'DISLIKE'] },
      },
      Reaction: {
        id: 1,
        userId: 1,
        movieId: 'string',
        movieTitle: 'string',
        type: 'LIKE',
        createdAt: '2024-01-01T00:00:00.000Z',
      },
      ReactionResponse: {
        message: 'Reação criada com sucesso!',
        reaction: { $ref: '#/components/schemas/Reaction' },
      },
      TMDBmovie: {
        id: 123,
        title: 'Exemplo de Filme',
        original_title: 'Exemplo de Filme',
        overview: 'Descrição do filme',
        poster_path: '/poster.jpg',
        media_type: 'movie',
        genre_ids: [1, 2],
        popularity: 10.5,
        release_date: '2024-01-01',
        vote_average: 8.2,
        vote_count: 100,
      },
      TMDBmovieScore: {
        $ref: '#/components/schemas/TMDBmovie',
        combinedScore: 9.1,
      },
      TMDBSearch: {
        page: 1,
        results: [{ $ref: '#/components/schemas/TMDBmovie' }],
        total_pages: 10,
        total_results: 100,
      },
      TMDBSearchResponse: {
        movieTitle: 'Exemplo de Filme',
        recommendations: [{ $ref: '#/components/schemas/TMDBmovie' }],
        total_pages: 10,
        total_results: 100,
        page: 1,
      },
    },
  },

  apis: ['./src/routes/*.ts'],
};

const outputFile = './swagger-output.json';
const routes = ['../../routes/index.ts'];

swaggerAutogen(outputFile, routes, doc);
