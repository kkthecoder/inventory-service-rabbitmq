// can be improved by using dotenv and environment variables
module.exports = {
  rabbitmq: {
    url: "amqp://localhost", // Replace with your RabbitMQ server URL
    exchangeName: "orders", // Replace with your exchange name
  },
};
