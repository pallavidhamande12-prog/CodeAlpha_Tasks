const { DataTypes } = require("sequelize");
const sequelize = require("../config/Database");
const Table = require("./Table");

const Reservation = sequelize.define("Reservation", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  customerName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  reservationTime: {
    type: DataTypes.DATE,
    allowNull: false
  },
  guests: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "reserved"
  },
  duration: {
  type: DataTypes.INTEGER,
  defaultValue: 2 // hours
},
TableId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Table,
      key: "id"
    },
    onDelete: "CASCADE"
  }
});

module.exports = Reservation;
