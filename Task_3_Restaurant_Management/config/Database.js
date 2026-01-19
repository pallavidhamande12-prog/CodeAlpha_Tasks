const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    'restaurant_db',
     'root',
      'mmlab',
       {
    host: 'localhost',
    dialect: 'mysql',
}); 

module.exports = sequelize;