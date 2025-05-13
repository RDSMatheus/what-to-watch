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
const user_service_1 = __importDefault(require("../services/user.service"));
class UserController {
    static createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield new user_service_1.default().createUser(req.body);
            res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
        });
    }
    static getUserByEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = req.params;
            const user = yield new user_service_1.default().getUserByEmail(email);
            res.status(200).json({ message: 'Usuário encontrado com sucesso!', user });
        });
    }
    static deleteUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield new user_service_1.default().deleteUserById(id);
            res.status(204).json({ message: 'Usuário deletado com sucesso!' });
        });
    }
    static updateUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { body } = req;
            const updatedUser = yield new user_service_1.default().updateUserById(id, body);
            res
                .status(200)
                .json({ message: 'Usuário atualizado com sucesso!', updatedUser });
        });
    }
}
exports.default = UserController;
//# sourceMappingURL=user.controller.js.map