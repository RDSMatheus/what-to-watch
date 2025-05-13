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
const client_1 = __importDefault(require("../../../infra/prisma/client"));
class ReactionRepository {
    createReaction(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const reaction = {
                type: body.type,
                movieId: body.movieId,
                user: { connect: { id: body.userId } },
                movieTitle: body.movieTitle,
            };
            yield client_1.default.reaction.create({ data: reaction });
        });
    }
    findReaction(userId, movieId) {
        return __awaiter(this, void 0, void 0, function* () {
            const reaction = yield client_1.default.reaction.findFirst({
                where: {
                    userId,
                    movieId,
                },
            });
            return reaction;
        });
    }
    getLikedMovies(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const reactions = yield client_1.default.reaction.findMany({
                where: { userId, type: 'LIKE' },
                select: { movieId: true, movieTitle: true },
            });
            return reactions;
        });
    }
    deleteReaction(userId, movieId) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleted = yield client_1.default.reaction.deleteMany({
                where: { userId, movieId },
            });
            return deleted;
        });
    }
    updateReaction(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const { movieId, type, userId } = body;
            yield client_1.default.reaction.update({
                where: { userId_movieId: { userId, movieId } },
                data: { type },
            });
        });
    }
}
exports.default = ReactionRepository;
//# sourceMappingURL=reaction.repository.js.map