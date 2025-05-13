"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const base_error_1 = require("../core/errors/base.error");
const internal_server_error_1 = require("../core/errors/internal-server.error");
const errorHandler = (app) => {
    app.use((error, req, res, next) => {
        console.log(error);
        if (error instanceof base_error_1.ErrorBase) {
            error.send(res);
        }
        else {
            new internal_server_error_1.InternalServerError().send(res);
        }
    });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=error-handler.middleware.js.map