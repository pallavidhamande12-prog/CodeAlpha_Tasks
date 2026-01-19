const Table = require("./Table");
const Reservation = require("./Reservation");

// Associations
Table.hasMany(Reservation, {
  foreignKey: "TableId"
});

Reservation.belongsTo(Table, {
  foreignKey: "TableId"
});

module.exports = {
  Table,
  Reservation
};