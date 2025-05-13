"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = __importDefault(require("express"));
const user_routes_1 = __importDefault(require("./user.routes"));
const reaction_routes_1 = __importDefault(require("./reaction.routes"));
const movie_routes_1 = __importDefault(require("./movie.routes"));
const auth_routes_1 = __importDefault(require("./auth.routes"));
const routes = (app) => {
    app.use(express_1.default.json());
    app.use(user_routes_1.default);
    app.use(reaction_routes_1.default);
    app.use(movie_routes_1.default);
    app.use(auth_routes_1.default);
};
exports.routes = routes;
//# sourceMappingURL=index.js.map