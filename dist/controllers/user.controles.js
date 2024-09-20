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
exports.handleUserSignup = void 0;
const user_module_1 = require("../models/user.module");
const bcrypt_1 = __importDefault(require("bcrypt"));
const producer_1 = require("../kafka/producer");
const consumer_1 = __importDefault(require("../kafka/consumer"));
const handleUserSignup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Fill all the fields" });
        }
        const user = yield user_module_1.userModel.findOne({ email });
        if (user) {
            return res.status(400).json({ error: "User alread exist" });
        }
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashedPassword = yield bcrypt_1.default.hash(password, salt);
        yield (0, producer_1.userProducer)(email, hashedPassword);
        function returnResponse(email, _id) {
            return res.status(201).json({
                status: "successful",
                data: {
                    email,
                    _id,
                }
            });
        }
        yield (0, consumer_1.default)("user", returnResponse);
    }
    catch (err) {
        console.log("Error in handleUserSignup function", err);
        return res.status(500).json({ error: "Unexpected error occured" });
    }
});
exports.handleUserSignup = handleUserSignup;
