"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENV = void 0;
const requiredEnv = (key) => {
    const value = process.env[key];
    if (!value) {
        throw new Error(`A variável de ambiente ${key} não está definida`);
    }
    return value;
};
exports.ENV = {
    AUTH_SECRET: requiredEnv('AUTH_SECRET'),
    TMBD_TOKEN: requiredEnv('TMBD_TOKEN'),
    DATABASE_URL: requiredEnv('DATABASE_URL'),
    SALT_ROUNDS: Number(requiredEnv('SALT_ROUNDS')),
    APP_URL: requiredEnv('APP_URL'),
    EMAIL: requiredEnv('EMAIL'),
    PASS: requiredEnv('PASS'),
    PORT: requiredEnv('PORT'),
    REDIS_URL: requiredEnv('REDIS_URL'),
};
//# sourceMappingURL=env.js.map