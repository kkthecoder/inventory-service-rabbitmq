const { startInventoryService } = require("./services/inventoryService");

startInventoryService().catch((error) => {
  console.error("Failed to start Inventory Service:", error);
});
