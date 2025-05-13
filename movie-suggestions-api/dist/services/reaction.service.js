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
const reaction_dto_1 = require("../dtos/reaction.dto");
const validation_error_1 = require("../core/errors/validation.error");
const reaction_repository_1 = __importDefault(require("../repository/reaction.repository"));
class ReactionService {
    constructor() {
        this.reactionRepository = new reaction_repository_1.default();
    }
    post(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const parsedReaction = reaction_dto_1.ReactionDto.safeParse(body);
            if (!parsedReaction.success) {
                throw new validation_error_1.ValidationError(parsedReaction.error.errors[0].message);
            }
            yield this.reactionRepository.post(body);
        });
    }
}
exports.default = ReactionService;
//# sourceMappingURL=reaction.service.js.map