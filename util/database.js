const {
    Sequelize
} = require('sequelize');


const sequelize = new Sequelize('passport', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;