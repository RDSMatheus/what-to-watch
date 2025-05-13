import { redisClient } from '../../infra/redis/client';

async function cache<T>(key: string): Promise<T | null> {
  const argument = key.toLowerCase();
  const cached = await redisClient.get(argument);

  if (!cached) return null;

  const parsedCache: T = JSON.parse(cached);

  return parsedCache;
}

export default cache;
