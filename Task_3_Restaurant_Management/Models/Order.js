const { DataTypes } = require("sequelize");
const sequelize = require("../config/Database");

const Order = sequelize.define("Order", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  totalAmount: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "pending" // pending, completed
  }
});

module.exports = Order;
