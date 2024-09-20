"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectMongoose = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connectMongoose = () => {
    const url = process.env.MONGO_DB;
    mongoose_1.default.connect(url).then((e) => {
        console.log("Mongoose connected");
    });
};
exports.connectMongoose = connectMongoose;
