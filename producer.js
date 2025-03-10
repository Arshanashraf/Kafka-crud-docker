import { Kafka } from "kafkajs";
const kafka = new Kafka({
    clientId: "crud-app",
    brokers: ['localhost:9092']
})
const producer = kafka.producer()

const produceMessage = async(topic, message) => {
    await producer.connect()
    await producer.send({
        topic,
        messages:[{value: JSON.stringify(message)}]
    });
    await producer.disconnect;
}
export default produceMessage;