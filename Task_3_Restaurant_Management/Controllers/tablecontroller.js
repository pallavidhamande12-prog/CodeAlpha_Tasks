const Table = require("../Models/Table");

// Create a new table
const createTable = async (req, res) => {
  try {
    const { tableNumber, capacity } = req.body;

    const table = await Table.create({
      tableNumber,
      capacity
    });

    res.status(201).json({
      message: "Table created successfully",
      table
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating table" });
  }
};

// Get all tables
const getAllTables = async (req, res) => {
  try {
    const tables = await Table.findAll();
    res.status(200).json(tables);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tables" });
  }
};

// Update table status
const updateTableStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const table = await Table.findByPk(id);

    if (!table) {
      return res.status(404).json({ message: "Table not found" });
    }

    table.status = status;
    await table.save();

    res.status(200).json({
      message: "Table status updated",
      table
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating table status" });
  }
};

module.exports = {
  createTable,
  getAllTables,
  updateTableStatus
};
