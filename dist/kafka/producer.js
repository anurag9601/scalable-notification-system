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
function userProducer() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Producer connecting...");
        yield producer.connect();
        console.log("Producer connected successfully");
        yield producer.send({
            topic: "user",
            messages: [{
                    key: "user",
                    value: "test",
                    partition: 0
                }]
        });
        console.log("Produced message");
        yield producer.disconnect();
        console.log("Producer disconnected");
    });
}
userProducer();
function emailProducer() {
    return __awaiter(this, void 0, void 0, function* () {
        yield producer.connect();
        yield producer.send({
            topic: "email-message",
            messages: [{
                    key: "user",
                    value: "test",
                    partition: 0
                }]
        });
        yield producer.disconnect();
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
