"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_service_1 = __importDefault(require("../../modules/auth/services/auth.service"));
const user_events_1 = require("./user.events");
const authService = new auth_service_1.default();
user_events_1.userEvents.on('userCreated', (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield authService.register(user);
        console.log(`Verification email sent to ${user.email}`);
    }
    catch (err) {
        console.error('Failed to send verification email:', err);
    }
}));
//# sourceMappingURL=listeners.js.map