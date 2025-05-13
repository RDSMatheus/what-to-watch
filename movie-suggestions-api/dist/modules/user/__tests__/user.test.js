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
const client_1 = require("../../../../prisma/app/generated/prisma/client");
const validation_error_1 = require("../../../core/errors/validation.error");
const user_repository_1 = __importDefault(require("../repository/user.repository"));
const user_service_1 = __importDefault(require("../services/user.service"));
jest.mock('../repository/user.repository');
describe('UserService.createUser', () => {
    let service;
    let repoMock;
    beforeEach(() => {
        jest.clearAllMocks();
        repoMock = new user_repository_1.default();
        service = new user_service_1.default(repoMock);
    });
    it('should call repository.createUser with parsed data when input is valid', () => __awaiter(void 0, void 0, void 0, function* () {
        const validUser = {
            name: 'alice',
            email: 'alice@example.com',
            password: '123456',
        };
        yield service.createUser(validUser);
        expect(repoMock.createUser).toHaveBeenCalledWith(validUser);
    }));
    it('should throw ValidationError', () => __awaiter(void 0, void 0, void 0, function* () {
        const invalidUser = { email: 'email@email.com' };
        // @ts-expect-error: testando cenário de DTO faltando campos
        yield expect(service.createUser(invalidUser)).rejects.toBeInstanceOf(validation_error_1.ValidationError);
    }));
    it("should throw ValidationError with 'Email já está em uso' on P2002 error", () => __awaiter(void 0, void 0, void 0, function* () {
        const duplicateError = new client_1.Prisma.PrismaClientKnownRequestError('Unique constraint error', {
            code: 'P2002',
            clientVersion: '1.0',
        });
        repoMock.createUser.mockRejectedValueOnce(duplicateError);
        const newUser = {
            name: 'joão',
            email: 'joão@email.com',
            password: '123456',
        };
        yield expect(service.createUser(newUser)).rejects.toThrow('Email inválido');
    }));
});
//# sourceMappingURL=user.test.js.map