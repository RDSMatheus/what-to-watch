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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_repository_1 = __importDefault(require("../user/repository/user.repository"));
const not_found_error_1 = require("../../core/errors/not-found.error");
const bcrypt_1 = __importDefault(require("bcrypt"));
const validation_error_1 = require("../../core/errors/validation.error");
const base_error_1 = require("../../core/errors/base.error");
const env_1 = require("../../config/env");
class AuthController {
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            try {
                if (!email)
                    throw new validation_error_1.ValidationError('Insira um email!');
                const user = yield new user_repository_1.default().getUserByEmail(email);
                if (!user)
                    throw new not_found_error_1.NotFoundError('Email inválido!');
                const comparedPassword = yield bcrypt_1.default.compare(password, user.password);
                if (!comparedPassword)
                    throw new validation_error_1.ValidationError('Senha inválida!');
                const token = jsonwebtoken_1.default.sign({ email: user.email, id: user.id }, env_1.ENV.AUTH_SECRET, {
                    expiresIn: '1h',
                });
                res.status(200).json({ message: 'Token retornado com sucesso!', token });
            }
            catch (error) {
                if (error instanceof base_error_1.ErrorBase)
                    res.status(400).json({ message: error.message });
            }
        });
    }
}
exports.default = AuthController;
//# sourceMappingURL=auth.controller.js.map