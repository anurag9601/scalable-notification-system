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
exports.default = userConsumer;
const admin_1 = require("./admin");
const user_module_1 = require("../models/user.module");
// const group = process.argv[2];
function userConsumer(group, returnResponse) {
    return __awaiter(this, void 0, void 0, function* () {
        const consumer = admin_1.kafka.consumer({ groupId: group });
        console.log("Consumer connecting...");
        yield consumer.connect();
        console.log("Consumer connected successfully");
        yield consumer.subscribe({ topics: ["user"] });
        yield consumer.run({
            eachMessage: (_a) => __awaiter(this, [_a], void 0, function* ({ message, pause }) {
                var _b;
                const values = (_b = message.value) === null || _b === void 0 ? void 0 : _b.toString();
                if (values) {
                    const value = JSON.parse(values);
                    try {
                        const newUser = yield user_module_1.userModel.create({
                            email: value.email,
                            password: value.password
                        });
                        if (newUser) {
                            yield returnResponse(newUser.email, newUser._id);
                        }
                    }
                    catch (err) {
                        console.log("error", err);
                        console.log("Something went wrong");
                        pause();
                        setTimeout(() => {
                            consumer.resume([{ topic: "user" }]);
                        }, 60 * 1000);
                    }
                }
            })
        });
    });
}
