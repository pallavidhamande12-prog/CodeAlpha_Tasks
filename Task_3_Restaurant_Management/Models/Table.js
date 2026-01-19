const { DataTypes } = require("sequelize");
const sequelize = require("../config/Database");

const Table = sequelize.define("Table", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  tableNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true
  },
  capacity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM("available", "occupied"),
    defaultValue: "available"
  }
});

module.exports = Table;