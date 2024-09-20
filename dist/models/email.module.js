"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const emailSchema = new mongoose_1.default.Schema({
    sendBy: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "users"
    },
    receiveBy: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "users"
    },
    message: {
        type: String,
        required: true,
        default: ""
    }
}, { timestamps: true });
exports.emailModel = mongoose_1.default.model("email", emailSchema);
