"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactionDto = void 0;
const zod_1 = require("zod");
const ReactionEnum = zod_1.z.enum(['LIKE', 'DISLIKE']);
exports.ReactionDto = zod_1.z.object({
    userId: zod_1.z
        .number({
        required_error: 'O campo userId é obrigatório.',
        invalid_type_error: 'ID do usuário deve ser um número',
    })
        .min(1, { message: 'Insira o ID do usuário' }),
    movieId: zod_1.z
        .string({
        required_error: 'O campo movieId é obrigatório.',
        invalid_type_error: 'ID do filme deve ser uma string',
    })
        .min(1, { message: 'Insira o ID do filme' }),
    type: ReactionEnum,
    movieTitle: zod_1.z
        .string({
        required_error: 'O campo movieId é obrigatório.',
        invalid_type_error: 'O titulo do filme deve ser uma string',
    })
        .min(1, { message: 'Insira o titulo do filme' }),
});
//# sourceMappingURL=create-reaction.dto.js.map