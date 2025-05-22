"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_error_1 = require("./base.error");
class BadRequestError extends base_error_1.ErrorBase {
    constructor(message) {
        super(400, message);
    }
}
exports.default = BadRequestError;
//# sourceMappingURL=bad-request.error.js.map