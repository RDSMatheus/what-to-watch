"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.helloWorldRouter = void 0;
const express_1 = require("express");
const hello_world_controller_1 = require("../controllers/hello-world-controller");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
exports.helloWorldRouter = (0, express_1.Router)();
exports.helloWorldRouter.get("/v1/hello-world", 
/*
#swagger.tags = ['Hello World']
#swagger.summary = 'Returns a hello world'
#swagger.responses[200]= {
  description: 'Hello world success.',
  schema: {
    message: "Hello World!"
  },
}
*/
(0, express_async_handler_1.default)(hello_world_controller_1.HelloWorldController.get));
//# sourceMappingURL=hello-world-routes.js.map