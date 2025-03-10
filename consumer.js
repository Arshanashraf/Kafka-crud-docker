import { Kafka } from "kafkajs";
import mongoose from "mongoose";
import User from "./models/user.model.js"

const kafka = new Kafka({
    clientId: "crud-app",
    brokers: ['localhost:9092']
})
const consumer = kafka.consumer({groupId: "crud-group"})

const consumeMessages = async () => {
    await consumer.connect()
    await consumer.subscribe({topic: 'user-events', fromBeginning: true})

    await consumer.run({
        eachMessage: async ({topic, partition, message}) => {
            const data = JSON.parse(message.value.toString());

            if(data.action === "CREATE") {
                await User.create(data.user)
            }
            else if(data.action === "UPDATE"){
                await User.findByIdAndUpdate(data.user.id, data.user)
            }
            else if(data.action === "DELETE"){
                await User.findByIdAndDelete(data.user.id)
            }
            console.log(`Processed message: ${message.value.toString()}`);
            
        }
    })
}
consumeMessages();