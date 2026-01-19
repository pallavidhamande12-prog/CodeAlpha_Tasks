const { DataTypes} = require("sequelize");
const sequelize = require("../config/Database");

const Menu = sequelize.define("Menu", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    }, 
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,  
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isAvailable: {
        type: DataTypes.BOOLEAN,
        defaultValue: true, 
    },
});
module.exports = Menu;