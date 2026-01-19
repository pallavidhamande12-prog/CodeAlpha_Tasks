const express = require("express");
const router = express.Router();
const {
  createTable,
  getAllTables,
  updateTableStatus
} = require("../Controllers/tablecontroller");

router.post("/tables", createTable);
router.get("/tables", getAllTables);
router.put("/tables/:id/status", updateTableStatus);

module.exports = router;
