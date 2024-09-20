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
exports.handleUserSendEmail = void 0;
const producer_1 = require("../kafka/producer");
const consumer_1 = require("../kafka/consumer");
const handleUserSendEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id: receiveBy } = req.params;
        const user = res.user;
        const sendBy = user._id;
        const { message, type } = req.body;
        if (!message || !type) {
            return res.status(400).json({ error: "Fill all the fields" });
        }
        yield (0, producer_1.emailProducer)(sendBy, receiveBy, message, type);
        function returnResponse(resValues) {
            return res.status(200).json({
                status: "send",
                data: resValues
            });
        }
        ;
        yield (0, consumer_1.emailConsumer)("email-message", returnResponse);
    }
    catch (err) {
    }
});
exports.handleUserSendEmail = handleUserSendEmail;
