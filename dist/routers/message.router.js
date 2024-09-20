"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const protect_route_1 = require("../middleware/protect.route");
const message_controller_1 = require("../controllers/message.controller");
const messageRouter = (0, express_1.Router)();
messageRouter.post("/email/:id", protect_route_1.protectRoute, message_controller_1.handleUserSendEmail);
exports.default = messageRouter;
