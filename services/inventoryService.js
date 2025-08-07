const amqp = require("amqplib");
const config = require("../config/config");
const logger = require("../utils/logger");
const dbConfig = require("../config/dbConfig");
const { MongoClient } = require("mongodb");

// assuming only one product, can be extended to handle multiple products
async function updateInventory(item) {
  const client = new MongoClient(dbConfig.mongodb.url, {
    useUnifiedTopology: true,
  });
  try {
    await client.connect();
    const db = client.db(dbConfig.mongodb.dbName);
    const collection = db.collection(dbConfig.mongodb.collectionName);

    logger.info(
      `Updating inventory for order with product id: ${item.productId}`
    );

    //for (const item of orderData.items) {
    const product = await collection.findOne({ productId: item.productId });
    if (!product || product.stock < item.quantity) {
      throw new Error(`Insufficient stock for product ID: ${item.productId}`);
    }
    await collection.updateOne(
      { productId: item.productId },
      { $inc: { stock: -item.quantity } }
    );
    //}

    // logger.info("Inventory updated successfully for order:", orderData.orderId);
  } catch (error) {
    logger.error("Error updating inventory:", error);
    // Handle error, possibly requeue the message or alert the system
  } finally {
    await client.close();
  }
}

async function startInventoryService() {
  try {
    const connection = await amqp.connect(config.rabbitmq.url);
    const channel = await connection.createChannel();
    await channel.assertExchange(config.rabbitmq.exchangeName, "fanout", {
      durable: true,
    });
    const queue = await channel.assertQueue("", { exclusive: true });
    await channel.bindQueue(queue.queue, config.rabbitmq.exchangeName, "");

    channel.consume(
      queue.queue,
      async (msg) => {
        if (msg !== null) {
          const orderData = JSON.parse(msg.content.toString());
          await updateInventory(orderData);
          channel.ack(msg);
        }
      },
      { noAck: false }
    );

    logger.info("Inventory Service is listening for order messages...");
  } catch (error) {
    logger.error("Error in Inventory Service:", error);
    throw new Error("RabbitMQ connection error");
  }
}

module.exports = { startInventoryService };
