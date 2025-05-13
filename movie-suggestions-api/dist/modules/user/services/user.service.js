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
const bcrypt_1 = __importDefault(require("bcrypt"));
const validation_error_1 = require("../../../core/errors/validation.error");
const create_user_dto_1 = require("../dto/create-user.dto");
const user_repository_1 = __importDefault(require("../repository/user.repository"));
const not_found_error_1 = require("../../../core/errors/not-found.error");
const base_error_1 = require("../../../core/errors/base.error");
const env_1 = require("../../../config/env");
const internal_server_error_1 = require("../../../core/errors/internal-server.error");
const user_events_1 = require("../../../core/events/user.events");
class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository !== null && userRepository !== void 0 ? userRepository : new user_repository_1.default();
    }
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const parsedUser = create_user_dto_1.UserDto.safeParse(user);
                if (!parsedUser.success) {
                    throw new validation_error_1.ValidationError(parsedUser.error.errors[0].message);
                }
                const hashedPassword = yield bcrypt_1.default.hash(parsedUser.data.password, env_1.ENV.SALT_ROUNDS);
                const newUser = Object.assign(Object.assign({}, parsedUser.data), { password: hashedPassword });
                const createdUser = yield this.userRepository.createUser(newUser);
                user_events_1.userEvents.emit('userCreated', createdUser);
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
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userRepository.getUserByEmail(email);
                if (!user)
                    throw new not_found_error_1.NotFoundError('Usuário não encontrado!');
                const safeUser = {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    verified: user.verified,
                };
                return safeUser;
            }
            catch (error) {
                if (error instanceof base_error_1.ErrorBase)
                    throw new not_found_error_1.NotFoundError(error.message);
                throw error;
            }
        });
    }
    deleteUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!userId)
                throw new validation_error_1.ValidationError('Insira um id válido');
            const id = Number(userId);
            try {
                const user = yield this.userRepository.getUserById(id);
                if (!user)
                    throw new not_found_error_1.NotFoundError('Usuário não encontrado');
                yield this.userRepository.deleteUserById(id);
            }
            catch (error) {
                if (error instanceof base_error_1.ErrorBase)
                    throw new not_found_error_1.NotFoundError(error.message);
                throw error;
            }
        });
    }
    updateUserById(userId, body) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!userId)
                throw new validation_error_1.ValidationError('Insira um id válido');
            const id = Number(userId);
            try {
                const existUser = yield this.userRepository.getUserById(id);
                if (!existUser)
                    throw new not_found_error_1.NotFoundError('Usuário não encontrado.');
                let hashedPassword = '';
                if (body.password)
                    hashedPassword = yield bcrypt_1.default.hash(body.password, env_1.ENV.SALT_ROUNDS);
                const newPassword = body.password ? hashedPassword : existUser.password;
                const updateUser = {
                    email: body.email ? body.email : existUser.email,
                    name: body.name ? body.name : existUser.name,
                    password: newPassword,
                };
                const updatedUser = yield this.userRepository.updateUserById(id, updateUser);
                return updatedUser;
            }
            catch (error) {
                if (error instanceof base_error_1.ErrorBase)
                    throw error;
                throw new internal_server_error_1.InternalServerError();
            }
        });
    }
    verifyEmail(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!userId)
                    throw new validation_error_1.ValidationError('Insira um id');
                const id = Number(userId);
                const existingUser = yield this.userRepository.getUserById(id);
                if (!existingUser)
                    throw new not_found_error_1.NotFoundError('Usuário não encontrado');
                if (existingUser.verified)
                    throw new validation_error_1.ValidationError('Usuário já verificado!');
                yield this.userRepository.verifyEmail(id);
            }
            catch (error) {
                if (error instanceof base_error_1.ErrorBase)
                    throw error;
                throw new internal_server_error_1.InternalServerError();
            }
        });
    }
    resetPassword(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!email)
                    throw new validation_error_1.ValidationError('Insira um email.');
                if (!password)
                    throw new validation_error_1.ValidationError('Insira uma senha.');
                if (password.length > 6)
                    throw new validation_error_1.ValidationError('A senha deve ter pelo menos 6 dígitos.');
                const hashedPassword = yield bcrypt_1.default.hash(password, env_1.ENV.SALT_ROUNDS);
                yield this.userRepository.resetPassword(email, hashedPassword);
            }
            catch (error) {
                if (error instanceof base_error_1.ErrorBase)
                    throw error;
                throw new internal_server_error_1.InternalServerError();
            }
        });
    }
}
exports.default = UserService;
//# sourceMappingURL=user.service.js.map