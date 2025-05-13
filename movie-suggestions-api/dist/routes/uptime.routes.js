"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const uptimeRouter = (0, express_1.Router)();
uptimeRouter.get('/uptime', (_req, res) => {
    res.status(200).json({ ok: true });
});
//# sourceMappingURL=uptime.routes.js.map