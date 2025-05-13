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
const base_error_1 = require("../../../core/errors/base.error");
const internal_server_error_1 = require("../../../core/errors/internal-server.error");
const not_found_error_1 = require("../../../core/errors/not-found.error");
const validation_error_1 = require("../../../core/errors/validation.error");
const create_reaction_dto_1 = require("../dto/create-reaction.dto");
const reaction_repository_1 = __importDefault(require("../repository/reaction.repository"));
class ReactionService {
    constructor(reactionRepository) {
        this.reactionRepository = reactionRepository !== null && reactionRepository !== void 0 ? reactionRepository : new reaction_repository_1.default();
    }
    toggleReaction(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const parsedReaction = create_reaction_dto_1.ReactionDto.safeParse(body);
                if (!parsedReaction.success) {
                    throw new validation_error_1.ValidationError(parsedReaction.error.errors[0].message);
                }
                const { userId, movieId, type } = parsedReaction.data;
                const existing = yield this.reactionRepository.findReaction(userId, movieId);
                if (!existing)
                    return yield this.reactionRepository.createReaction(parsedReaction.data);
                if (existing.type === type) {
                    yield this.reactionRepository.deleteReaction(userId, movieId);
                    return;
                }
                return this.reactionRepository.updateReaction(parsedReaction.data);
            }
            catch (error) {
                if (error instanceof validation_error_1.ValidationError) {
                    throw new validation_error_1.ValidationError(error.message);
                }
                else
                    throw new internal_server_error_1.InternalServerError();
            }
        });
    }
    getLikedMovies(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!userId)
                    throw new validation_error_1.ValidationError('Insira um id.');
                const likedMovies = yield this.reactionRepository.getLikedMovies(userId);
                return likedMovies;
            }
            catch (error) {
                if (error instanceof validation_error_1.ValidationError) {
                    throw new validation_error_1.ValidationError(error.message);
                }
                else
                    throw new internal_server_error_1.InternalServerError();
            }
        });
    }
    deleteReaction(userId, movieId) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(userId);
            try {
                const deleted = yield this.reactionRepository.deleteReaction(id, movieId);
                if (!deleted.count)
                    throw new not_found_error_1.NotFoundError('Reação não encontrada');
            }
            catch (error) {
                if (error instanceof base_error_1.ErrorBase)
                    throw error;
                throw new internal_server_error_1.InternalServerError();
            }
        });
    }
}
exports.default = ReactionService;
//# sourceMappingURL=reaction.service.js.map