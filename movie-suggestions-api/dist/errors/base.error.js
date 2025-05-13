"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorBase = void 0;
class ErrorBase extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
    }
    send(res) {
        res.status(this.status).send({ message: this.message });
    }
}
exports.ErrorBase = ErrorBase;
//# sourceMappingURL=base.error.js.map