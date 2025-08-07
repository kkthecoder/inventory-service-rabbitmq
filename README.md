# Inventory Service

## Overview

The Inventory Service is a Node.js application that manages inventory data using RabbitMQ for messaging and MongoDB for data storage. It listens for order messages and updates the inventory accordingly. "order-service-rabbitmq" repository can be used to start order service and send order message.

## Features

- Connects to RabbitMQ to process order messages.
- Updates inventory data in MongoDB.
- Provides a script to populate initial inventory data.

## Prerequisites

- Node.js (version 14.x or later)
- MongoDB (version 8.x or later)
- RabbitMQ (version 4.x or later)
- npm (Node Package Manager)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/inventory-service.git
   cd inventory-service

   ```

2. Install dependencies:
   ```
   npm install
   ```

## Configuration

Ensure that your configuration files, such as config.js and dbConfig.js, are correctly set up with the appropriate RabbitMQ and MongoDB connection details.

## Usage

- Start the Service

To start the inventory service, run:

```
npm start
```

This will execute the index.js file, which initializes and starts the inventory service.

- Populate Inventory Data
  To populate the database with initial inventory data, run:

```
npm run populate-inventory
```

## Scripts

npm start: Starts the inventory service.

npm run populate-inventory: Populates the database with initial inventory data.

## License

This project is licensed under the MIT License.
