"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_autogen_1 = __importDefault(require("swagger-autogen"));
const swaggerAutogenInstance = (0, swagger_autogen_1.default)();
const doc = {
    info: {
        title: 'movie-suggestions-api Api',
        description: 'Documentação da api movie-suggestions-api Api.',
    },
    schemes: ['http'],
    securityDefinitions: {
        bearerAuth: {
            type: 'apiKey',
            name: 'Authorization',
            in: 'header',
            description: 'Insira o token JWT no formato **Bearer &lt;token&gt;**',
        },
    },
    definitions: {
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
    },
    host: process.env.BASE_URL || 'localhost:3000',
    apis: ['./src/routes/*.ts'],
};
const outputFile = './swagger-output.json';
const routes = ['../../routes/index.ts'];
swaggerAutogenInstance(outputFile, routes, doc);
(0, swagger_autogen_1.default)(outputFile, routes, doc);
//# sourceMappingURL=swagger.js.map