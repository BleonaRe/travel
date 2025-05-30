const { DataTypes } = require('sequelize');
const sequelize = require('../db');



const Universiteti = sequelize.define('Universiteti', {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    universityName: {
        type: DataTypes.STRING,
        allowNull: false
    },

    city: {
        type: DataTypes.STRING,
        allowNull: false
    },
});

module.exports = Universiteti;