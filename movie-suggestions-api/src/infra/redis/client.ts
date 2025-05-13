import { createClient } from 'redis';

const redisClient = createClient();

redisClient.on('error', (error) => {
  console.error('Redis error: ', error);
});

async function connectRedis() {
  try {
    if (!redisClient.isOpen) {
      await redisClient.connect();
      console.log('Connected to Redis');
    }
  } catch (error) {
    console.error('Redis connection error: ', error);
  }
}

export { redisClient, connectRedis };
