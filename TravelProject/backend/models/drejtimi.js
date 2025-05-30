const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Universiteti = require('./universiteti');



const Drejtimi = sequelize.define('Drejtimi', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    drejtimiName: {
        type: DataTypes.STRING,
        allowNull: false    
    },
    duration:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    universityId: {
        type: DataTypes.INTEGER,
        references: {
            model: Universiteti,
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',

    },

    });
    Universiteti.hasMany(Drejtimi, { foreignKey: 'universityId' });
    Drejtimi.belongsTo(Universiteti, { foreignKey: 'universityId' });

module.exports = Drejtimi;