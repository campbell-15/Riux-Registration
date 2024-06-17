// backend/config/database.js
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
});

sequelize.sync().then(() => {
    console.log('Database synchronized');
}).catch((error) => {
    console.error('Error synchronizing database:', error);
});

module.exports = sequelize;
