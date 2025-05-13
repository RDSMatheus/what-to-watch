"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactionDto = void 0;
const zod_1 = require("zod");
const ReactionEnum = zod_1.z.enum(['LIKE', 'DISLIKE']);
exports.ReactionDto = zod_1.z.object({
    userId: zod_1.z.number(),
    movieId: zod_1.z.string(),
    type: ReactionEnum,
});
//# sourceMappingURL=reaction.dto.js.map