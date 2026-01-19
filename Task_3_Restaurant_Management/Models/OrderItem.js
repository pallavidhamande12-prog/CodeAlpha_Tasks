const { DataTypes } = require("sequelize");
const sequelize = require("../config/Database");

const OrderItem = sequelize.define("OrderItem", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = OrderItem;
