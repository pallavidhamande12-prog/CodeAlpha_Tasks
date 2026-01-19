const { DataTypes } = require("sequelize");
const sequelize = require("../config/Database");

const Inventory = sequelize.define("Inventory", {
  itemName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
});

module.exports = Inventory;
