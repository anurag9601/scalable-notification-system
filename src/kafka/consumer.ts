import { kafka } from "./admin";

const group = process.argv[2];

const consumer = kafka.consumer({ groupId: group });

async function init() {
    console.log("Consumer connecting...");
    await consumer.connect();
    console.log("Consumer connected successfully");

    await consumer.subscribe({ topics: ["user", "email-message", "sms-message", "imp-message"], fromBeginning: true });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log(`{ topic:${topic},
                partition:${partition},
                message: ${message.value?.toString()}, }`);
        }
    });
}

init();