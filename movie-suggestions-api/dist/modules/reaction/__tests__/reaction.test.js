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
const validation_error_1 = require("../../../core/errors/validation.error");
const reaction_repository_1 = __importDefault(require("../repository/reaction.repository"));
const reaction_service_1 = __importDefault(require("../services/reaction.service"));
jest.mock('../repository/reaction.repository');
describe('ReactionService.post', () => {
    let service;
    let repoMock;
    beforeEach(() => {
        jest.clearAllMocks();
        repoMock = new reaction_repository_1.default();
        service = new reaction_service_1.default(repoMock);
    });
    it('should call repository.post when parsed data is correct', () => __awaiter(void 0, void 0, void 0, function* () {
        const validReaction = {
            movieId: '550',
            userId: 2,
            type: 'LIKE',
            movieTitle: 'Batman',
        };
        yield service.toggleReaction(validReaction);
        expect(repoMock.createReaction).toHaveBeenCalledWith(validReaction);
    }));
    it('should throw Validation Error when missing userId', () => __awaiter(void 0, void 0, void 0, function* () {
        const invalidReaction = {
            movieId: '550',
            movieTitle: 'Fight club',
            type: 'LIKE',
        };
        yield expect(
        // @ts-expect-error: testando cenário de DTO faltando campos
        service.toggleReaction(invalidReaction)).rejects.toBeInstanceOf(validation_error_1.ValidationError);
    }));
});
//# sourceMappingURL=reaction.test.js.map