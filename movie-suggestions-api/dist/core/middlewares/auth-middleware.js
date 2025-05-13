"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const validation_error_1 = require("../errors/validation.error");
const jsonwebtoken_1 = __importStar(require("jsonwebtoken"));
const env_1 = require("../../config/env");
const authMiddleware = (req, res, next) => {
    const auth = req.headers.authorization;
    if (!auth)
        throw new validation_error_1.ValidationError('Token de autorização necessário');
    try {
        const token = auth.split(' ')[1];
        const validToken = jsonwebtoken_1.default.verify(token, env_1.ENV.AUTH_SECRET);
        console.log(validToken);
        if (!validToken)
            throw new validation_error_1.ValidationError('Token inválido');
        next();
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.JsonWebTokenError) {
            res.status(401).json({ message: 'Token inválido!' });
            return;
        }
        else {
            res.status(500).json({ message: 'Erro interno no servidor!' });
            return;
        }
    }
};
exports.default = authMiddleware;
//# sourceMappingURL=auth-middleware.js.map