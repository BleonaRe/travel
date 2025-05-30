const { DataTypes } = require('sequelize');
const sequelize = require('../db');



const Employe = sequelize.define('Employe', {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    surname: {
        type: DataTypes.STRING,
        allowNull: false
    },
});

module.exports = Employe;