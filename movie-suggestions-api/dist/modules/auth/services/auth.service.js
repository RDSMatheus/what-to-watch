"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const jsonwebtoken_1 = __importStar(require("jsonwebtoken"));
const user_repository_1 = __importDefault(require("../../user/repository/user.repository"));
const not_found_error_1 = require("../../../core/errors/not-found.error");
const bcrypt_1 = __importDefault(require("bcrypt"));
const validation_error_1 = require("../../../core/errors/validation.error");
const base_error_1 = require("../../../core/errors/base.error");
const env_1 = require("../../../config/env");
const internal_server_error_1 = require("../../../core/errors/internal-server.error");
const nodemailer_1 = require("../../../core/utils/nodemailer");
const user_service_1 = __importDefault(require("./../../user/services/user.service"));
class AuthService {
    constructor(userService) {
        this.userService = userService !== null && userService !== void 0 ? userService : new user_service_1.default();
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!email)
                    throw new validation_error_1.ValidationError('Insira um email!');
                const user = yield new user_repository_1.default().getUserByEmail(email);
                if (!user)
                    throw new not_found_error_1.NotFoundError('Email inválido!');
                const comparedPassword = yield bcrypt_1.default.compare(password, user.password);
                if (!comparedPassword)
                    throw new validation_error_1.ValidationError('Senha inválida!');
                const token = yield this.tokenGenerate(user.email, user.id);
                return token;
            }
            catch (error) {
                if (error instanceof base_error_1.ErrorBase)
                    throw error;
                throw new internal_server_error_1.InternalServerError();
            }
        });
    }
    register(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield this.tokenGenerate(user.email, user.id);
            const verificationUrl = `${env_1.ENV.APP_URL}/auth/verify-email?token=${token}`;
            yield (0, nodemailer_1.mailSend)({
                email: user.email,
                subject: 'Verifique seu e-mail',
                html: `<h1>Olá, ${user.name}</h1>
      <p>Clique <a href="${verificationUrl}">aqui</a> para verificar seu e-mail.</p>`,
            });
        });
    }
    verifyEmail(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const payload = jsonwebtoken_1.default.verify(token, env_1.ENV.AUTH_SECRET);
                this.userService.verifyEmail(payload.id);
            }
            catch (error) {
                if (error instanceof jsonwebtoken_1.JsonWebTokenError)
                    throw new validation_error_1.ValidationError('Token inválido.');
                throw new internal_server_error_1.InternalServerError();
            }
        });
    }
    sendRecoverEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!email)
                    throw new validation_error_1.ValidationError('Insira um email!');
                const user = yield new user_repository_1.default().getUserByEmail(email);
                if (!user)
                    throw new not_found_error_1.NotFoundError('Email inválido!');
                const token = yield this.tokenGenerate(user.email, user.id);
                const verificationUrl = `${env_1.ENV.APP_URL}/auth/redefine-password?token=${token}`;
                yield (0, nodemailer_1.mailSend)({
                    email: user.email,
                    subject: 'Recuperação de senha',
                    html: `<h1>Olá, ${user.name}</h1>
        <p>Clique <a href="${verificationUrl}">aqui</a> para redefinir sua senha.</p>
        <p>Esse link expira em 1 hora.</p>
        `,
                });
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
                    throw new validation_error_1.ValidationError('Insira um email válido.');
                if (password.length < 6)
                    throw new validation_error_1.ValidationError('A senha deve conter 6 digitos.');
                yield this.userService.resetPassword(email, password);
            }
            catch (error) {
                if (error instanceof base_error_1.ErrorBase)
                    throw error;
                throw new internal_server_error_1.InternalServerError();
            }
        });
    }
    tokenGenerate(email, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = jsonwebtoken_1.default.sign({ email, id }, env_1.ENV.AUTH_SECRET, {
                expiresIn: '1h',
            });
            return token;
        });
    }
}
exports.default = AuthService;
//# sourceMappingURL=auth.service.js.map