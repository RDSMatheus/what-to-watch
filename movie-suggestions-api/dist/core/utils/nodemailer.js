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
exports.mailSend = mailSend;
const nodemailer_1 = __importDefault(require("nodemailer"));
const env_1 = require("../../config/env");
const transporter = nodemailer_1.default.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: env_1.ENV.EMAIL,
        pass: env_1.ENV.PASS,
    },
});
function mailSend(_a) {
    return __awaiter(this, arguments, void 0, function* ({ email, subject, html, }) {
        yield transporter.sendMail({
            from: env_1.ENV.EMAIL,
            to: email,
            subject,
            html,
        });
    });
}
//# sourceMappingURL=nodemailer.js.map