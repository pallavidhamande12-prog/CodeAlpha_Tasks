const Order = require("./Order");
const Menu = require("./Menu");
const OrderItem = require("./OrderItem");

// Order → OrderItems
Order.hasMany(OrderItem);
OrderItem.belongsTo(Order);

// Menu → OrderItems
Menu.hasMany(OrderItem);
OrderItem.belongsTo(Menu);

module.exports = { Order, Menu, OrderItem };
