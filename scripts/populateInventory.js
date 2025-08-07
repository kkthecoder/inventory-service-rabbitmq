const { MongoClient } = require("mongodb");
const dbConfig = require("../config/dbConfig");

async function populateInventory() {
  const client = new MongoClient(dbConfig.mongodb.url, { useUnifiedTopology: true });

  try {
    await client.connect();
    const db = client.db(dbConfig.mongodb.dbName);
    const collection = db.collection(dbConfig.mongodb.collectionName);

    const sampleData = [
      { productId: "p1", name: "Product 1", stock: 100 },
      { productId: "p2", name: "Product 2", stock: 150 },
      { productId: "p3", name: "Product 3", stock: 200 },
    ];

    await collection.insertMany(sampleData);
    console.log("Sample inventory data inserted successfully.");
  } catch (error) {
    console.error("Error inserting sample data:", error);
  } finally {
    await client.close();
  }
}

populateInventory();
