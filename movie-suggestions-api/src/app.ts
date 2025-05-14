import express from 'express';
import { routes } from './routes';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from './core/docs/swagger-output.json';
import cors from 'cors';
import { errorHandler } from './core/middlewares/error-handler.middleware';
import { connectRedis } from './infra/redis/client';
import './core/events/listeners';
import { ENV } from './config/env';
import limiter from './infra/express-rate-limit/limiter';

const app = express();

const PORT = ENV.PORT || 3000;

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(cors());
app.set('query parser', 'extended');

app.use(limiter);
connectRedis();
routes(app);
errorHandler(app);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT} http://localhost:${PORT}`);
  console.log(`Documentação http://localhost:${PORT}/docs`);
});
