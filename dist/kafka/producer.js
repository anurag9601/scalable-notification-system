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
exports.userProducer = userProducer;
exports.emailProducer = emailProducer;
exports.smsProducer = smsProducer;
exports.impMessageProducer = impMessageProducer;
const admin_1 = require("./admin");
const producer = admin_1.kafka.producer();
function userProducer(email, hashedPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("User Producer connecting...");
        yield producer.connect();
        console.log("User Producer connected successfully");
        yield producer.send({
            topic: "user",
            messages: [{
                    key: "userInfo",
                    value: JSON.stringify({ email, password: hashedPassword }),
                    partition: 0,
                }]
        });
        console.log("User Produced user");
        yield producer.disconnect();
        console.log("User Producer disconnected");
    });
}
function emailProducer(sendBy, receiveBy, message, type) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Email Producer connecting...");
        yield producer.connect();
        console.log("Email Producer connected successfully");
        yield producer.send({
            topic: "email-message",
            messages: [{
                    key: "email",
                    value: JSON.stringify({ sendBy, receiveBy, message }),
                    partition: type === "spam" ? 0 : 1,
                }]
        });
        console.log("Email Produced email");
        yield producer.disconnect();
        console.log("Email Producer disconnected");
    });
}
function smsProducer() {
    return __awaiter(this, void 0, void 0, function* () {
        yield producer.connect();
        yield producer.send({
            topic: "sms-message",
            messages: [{
                    key: "user",
                    value: "test",
                    partition: 0
                }]
        });
        yield producer.disconnect();
    });
}
function impMessageProducer() {
    return __awaiter(this, void 0, void 0, function* () {
        yield producer.connect();
        yield producer.send({
            topic: "imp-message",
            messages: [{
                    key: "user",
                    value: "test",
                    partition: 0
                }]
        });
        yield producer.disconnect();
    });
}
