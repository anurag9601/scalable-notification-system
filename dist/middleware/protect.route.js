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
Object.defineProperty(exports, "__esModule", { value: true });
exports.protectRoute = void 0;
const jwt_1 = require("../services/jwt");
const protectRoute = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(400).json({ error: "Token not found" });
        }
        const validToken = yield (0, jwt_1.verifyUserToken)(token);
        if (!validToken) {
            return res.status(401).json({ error: "Invalid token" });
        }
        //when we will try to insert value of user by declaring varibale key then it will give us type error that user con't exist in Response so for solving this problem we will create <file_name>.d.ts file in this file name d stands for declaration so we will create typescript declaration file and then define type of user using interface for example: open express.d.ts file
        res.user = validToken;
    }
    catch (err) {
        console.log("Error in protectRoute function", err);
        res.status(500).json({ error: "Unexpected error occured" });
    }
    finally {
        next();
    }
});
exports.protectRoute = protectRoute;
