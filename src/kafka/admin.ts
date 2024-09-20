import { Kafka } from "kafkajs";

export const kafka = new Kafka({
    clientId: "my-app",
    brokers: ["192.168.31.181:9092"],
});


async function init(){
    const admin = kafka.admin();
    console.log("Admin connecting...");
    await admin.connect();
    console.log("Admin connected successfully");
    await admin.createTopics({
        topics:[
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
    })
    await admin.disconnect();
    console.log("Admin disconnected...");
}

init();