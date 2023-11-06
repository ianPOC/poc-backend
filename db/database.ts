const { Pool, Client } = require('pg');
const Sequelize = require('sequelize');

const sequelize = new Sequelize('user_pgdb', 'postgres', 'postgres', {
    dialect: 'postgres',
    host: 'localhost'
});

module.exports = sequelize;
