const User = require("./User");
const Event = require("./Event");
const Registration = require("./Registration");

//Handling Associations
//many-to-many relationship between Users and Events through Registrations
User.belongsToMany(Event, { 
    through: Registration,
     foreignKey: 'userId',
 });

Event.belongsToMany(User, {
    through: Registration,
    foreignKey: 'eventId',
});

// Defining foreign key relationships in Registration model
Registration.belongsTo(User, { foreignKey: 'userId' });
Registration.belongsTo(Event, { foreignKey: 'eventId' });

module.exports = {
    User,
    Event,
    Registration,
};