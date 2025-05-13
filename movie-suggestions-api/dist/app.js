"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_output_json_1 = __importDefault(require("./core/docs/swagger-output.json"));
const cors_1 = __importDefault(require("cors"));
const error_handler_middleware_1 = require("./core/middlewares/error-handler.middleware");
const client_1 = require("./infra/redis/client");
require("./core/events/listeners");
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use('/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_output_json_1.default));
app.use((0, cors_1.default)());
(0, client_1.connectRedis)();
(0, routes_1.routes)(app);
(0, error_handler_middleware_1.errorHandler)(app);
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port} http://localhost:${port}`);
    console.log(`Documentação http://localhost:${port}/docs`);
});
//# sourceMappingURL=app.js.map