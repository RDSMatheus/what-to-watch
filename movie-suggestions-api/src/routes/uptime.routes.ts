import { Router } from 'express';

const uptimeRouter = Router();

uptimeRouter.get('/uptime', (_req, res) => {
  res.status(200).json({ ok: true });
});

export default uptimeRouter