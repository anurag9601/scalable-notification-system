"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controles_1 = require("../controllers/user.controles");
const router = (0, express_1.Router)();
router.post("/signup", user_controles_1.handleUserSignup);
exports.default = router;
