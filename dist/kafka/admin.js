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
exports.kafka = void 0;
const kafkajs_1 = require("kafkajs");
exports.kafka = new kafkajs_1.Kafka({
    clientId: "my-app",
    brokers: ["192.168.31.181:9092"],
});
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        const admin = exports.kafka.admin();
        console.log("Admin connecting...");
        yield admin.connect();
        console.log("Admin connected successfully");
        yield admin.createTopics({
            topics: [
                {
                    topic: "user",
                    numPartitions: 2,
                },
                {
                    topic: "email-message",
                    numPartitions: 2,
                },
                {
                    topic: "sms-message",
                    numPartitions: 2,
                },
                {
                    topic: "imp-message",
                    numPartitions: 2,
                }
            ]
        });
        yield admin.disconnect();
        console.log("Admin disconnected...");
    });
}
init();
