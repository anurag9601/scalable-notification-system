import { Kafka } from "kafkajs";

export const kafka = new Kafka({
    clientId: "my-app",
    brokers: ["192.168.31.181:9092"],
});


export async function kafkaAdmin(){
    const admin = kafka.admin();
    console.log("Admin connecting...");
    await admin.connect();
    console.log("Admin connected successfully");
    await admin.createTopics({
        topics:[
            {
                topic: "user",
                numPartitions: 1,
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