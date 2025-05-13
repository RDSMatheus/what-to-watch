"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalServerError = void 0;
const base_error_1 = require("./base-error");
class InternalServerError extends base_error_1.ErrorBase {
    constructor(message = 'Internal Server Error') {
        super(500, message);
    }
}
exports.InternalServerError = InternalServerError;
//# sourceMappingURL=internal-server-error.js.map