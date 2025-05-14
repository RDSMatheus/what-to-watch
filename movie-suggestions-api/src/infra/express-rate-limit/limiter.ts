import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: false,
  message: 'Muitas requisições deste IP, tente novamente após 15 minutos',
});

export default limiter;
