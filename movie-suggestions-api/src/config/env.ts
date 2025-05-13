const requiredEnv = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`A variável de ambiente ${key} não está definida`);
  }
  return value;
};

export const ENV = {
  AUTH_SECRET: requiredEnv('AUTH_SECRET'),
  TMBD_TOKEN: requiredEnv('TMBD_TOKEN'),
  DATABASE_URL: requiredEnv('DATABASE_URL'),
  SALT_ROUNDS: Number(requiredEnv('SALT_ROUNDS')),
  APP_URL: requiredEnv('APP_URL'),
  EMAIL: requiredEnv('EMAIL'),
  PASS: requiredEnv('PASS'),
};
