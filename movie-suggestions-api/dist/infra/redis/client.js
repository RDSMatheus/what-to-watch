"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisClient = void 0;
exports.connectRedis = connectRedis;
const redis_1 = require("redis");
const env_1 = require("../../config/env");
const redisClient = (0, redis_1.createClient)({
    url: env_1.ENV.REDIS_URL,
});
exports.redisClient = redisClient;
redisClient.on('error', (error) => {
    console.error('Redis error: ', error);
});
function connectRedis() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!redisClient.isOpen) {
                yield redisClient.connect();
                console.log('Connected to Redis');
            }
        }
        catch (error) {
            console.error('Redis connection error: ', error);
        }
    });
}
//# sourceMappingURL=client.js.map