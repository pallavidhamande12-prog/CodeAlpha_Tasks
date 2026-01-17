const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "event_reg_db",      // database name 
  "root", // username
  "mmlab", // password
  {
    host: "localhost",
    dialect: "mysql",
  }
);

module.exports = sequelize;
