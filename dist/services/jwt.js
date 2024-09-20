"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUserToken = exports.createUserToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createUserToken = (user) => {
    const secret = process.env.SECRET;
    const payload = {
        _id: user._id,
        email: user.email,
    };
    const token = jsonwebtoken_1.default.sign(payload, secret);
    return token;
};
exports.createUserToken = createUserToken;
const verifyUserToken = (token) => {
    const secret = process.env.SECRET;
    const payload = jsonwebtoken_1.default.verify(token, secret);
    return payload;
};
exports.verifyUserToken = verifyUserToken;
