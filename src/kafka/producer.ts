import { kafka } from "./admin";

const producer = kafka.producer();

export async function userProducer() {
    console.log("Producer connecting...");
    await producer.connect();
    console.log("Producer connected successfully");
    await producer.send({
        topic: "user",
        messages: [{
            key: "user",
            value: "test",
            partition: 0
        }]
    })
    console.log("Produced message");
    await producer.disconnect();
    console.log("Producer disconnected");
}

userProducer();

export async function emailProducer() {
    await producer.connect();
    await producer.send({
        topic: "email-message",
        messages: [{
            key: "user",
            value: "test",
            partition: 0
        }]
    })
    await producer.disconnect()
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