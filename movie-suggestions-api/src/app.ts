import express from 'express';
import { routes } from './routes';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from './core/docs/swagger-output.json';
import cors from 'cors';
import { errorHandler } from './core/middlewares/error-handler.middleware';
import { connectRedis } from './infra/redis/client';
import './core/events/listeners';

const app = express();

const port = process.env.PORT || 3000;

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(cors());

connectRedis();
routes(app);
errorHandler(app);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port} http://localhost:${port}`);
  console.log(`Documentação http://localhost:${port}/docs`);
});
