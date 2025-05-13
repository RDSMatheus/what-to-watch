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
const client_1 = require("../../prisma/app/generated/prisma/client");
const user_dto_1 = require("../dtos/user.dto");
const validation_error_1 = require("../core/errors/validation.error");
const user_repository_1 = __importDefault(require("../repository/user.repository"));
class UserService {
    constructor() {
        this.userRepository = new user_repository_1.default();
    }
    post(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const parsedUser = user_dto_1.UserDto.safeParse(user);
                if (!parsedUser.success) {
                    throw new validation_error_1.ValidationError(parsedUser.error.errors[0].message);
                }
                yield this.userRepository.post(parsedUser.data);
            }
            catch (error) {
                if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                    if (error.code === 'P2002')
                        throw new validation_error_1.ValidationError('Email já está em uso');
                    throw new validation_error_1.ValidationError(`Erro no de dados: ${error.message}`);
                }
                throw error;
            }
        });
    }
}
exports.default = UserService;
//# sourceMappingURL=user.service.js.map