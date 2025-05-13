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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cache = void 0;
const client_1 = __importDefault(require("../../infra/redis/client"));
const cache = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    console.log(userId);
    try {
        const cached = yield client_1.default.get(userId);
        //escapar o get pra não ser confundido pelo swagger-autogen como uma rota
        if (!cached) {
            next();
            return;
        }
        console.log('Vindo do cache');
        const parsedCache = JSON.parse(cached);
        res.status(200).json({
            message: 'Filme encontrado no cache',
            movies: parsedCache,
        });
        return;
    }
    catch (error) {
        console.error('Cache middleware error: ', error);
        next();
    }
});
exports.cache = cache;
//# sourceMappingURL=cache.middleware.js.map