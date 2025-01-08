const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Service = sequelize.define('Service', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    duration: {
        type: DataTypes.INTEGER, 
        allowNull: false,
    },
    discount: {
        type: DataTypes.FLOAT, 
        defaultValue: 0, 
        validate: {
            min: 0,
            max: 100,
        },
    },
});

module.exports = Service;
