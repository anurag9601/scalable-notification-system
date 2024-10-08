import { kafka } from "./admin";

const producer = kafka.producer();

export async function userProducer(email: string, hashedPassword: string) {
    console.log("User Producer connecting...");
    await producer.connect();
    console.log("User Producer connected successfully");
    await producer.send({
        topic: "user",
        messages: [{
            key: "userInfo",
            value: JSON.stringify({ email, password: hashedPassword }),
            partition: 0,

        }]
    })
    console.log("User Produced user");
    await producer.disconnect();
    console.log("User Producer disconnected");
}

export async function emailProducer(sendBy: string, receiveBy: string, message: string, type: string) {
    console.log("Email Producer connecting...");
    await producer.connect();
    console.log("Email Producer connected successfully");
    await producer.send({
        topic: "email-message",
        messages: [{
            key: "email",
            value: JSON.stringify({ sendBy, receiveBy, message }),
            partition: type === "spam" ? 0 : 1,
        }]
    })
    console.log("Email Produced email");
    await producer.disconnect()
    console.log("Email Producer disconnected");
}

export async function smsProducer() {
    await producer.connect();
    await producer.send({
        topic: "sms-message",
        messages: [{
            key: "user",
            value: "test",
            partition: 0
        }]
    })
    await producer.disconnect()
}

export async function impMessageProducer() {
    await producer.connect();
    await producer.send({
        topic: "imp-message",
        messages: [{
            key: "user",
            value: "test",
            partition: 0
        }]
    })
    await producer.disconnect()
}