const express = require("express");
const router = express.Router();
const { addInventory } = require("../Controllers/inventorycontroller");

router.post("/inventory", addInventory);

module.exports = router;
