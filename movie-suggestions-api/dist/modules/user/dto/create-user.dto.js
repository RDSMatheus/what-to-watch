"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDto = void 0;
const zod_1 = require("zod");
exports.UserDto = zod_1.z.object({
    email: zod_1.z.string().email({ message: 'Email inválido' }).trim().toLowerCase(),
    name: zod_1.z
        .string()
        .trim()
        .toLowerCase()
        .min(1, { message: 'Nome é obrigatório' }),
    password: zod_1.z
        .string()
        .min(6, { message: 'A senha deve ter pelo menos 6 digitos' }),
});
//# sourceMappingURL=create-user.dto.js.map