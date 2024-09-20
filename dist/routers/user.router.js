"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controles_1 = require("../controllers/user.controles");
const userRouter = (0, express_1.Router)();
userRouter.post("/signup", user_controles_1.handleUserSignup);
exports.default = userRouter;
