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
const reaction_service_1 = __importDefault(require("../services/reaction.service"));
class ReactionController {
    static createReaction(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield new reaction_service_1.default().toggleReaction(req.body);
            res.status(200).json({ message: 'Reação criada' });
        });
    }
    static getLikedMovies(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const parsedId = Number(req.params.userId);
            const likedMovies = yield new reaction_service_1.default().getLikedMovies(parsedId);
            res.status(200).json({ message: 'Filmes retornados', likedMovies });
        });
    }
    static deleteReaction(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId, movieId } = req.params;
            yield new reaction_service_1.default().deleteReaction(userId, movieId);
            res.status(204).json({});
        });
    }
}
exports.default = ReactionController;
//# sourceMappingURL=reaction.controller.js.map