const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Employe = require('./employe');

const Contract = sequelize.define('Contract', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false    
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    employeId: {
        type: DataTypes.INTEGER,
        references: {
            model: Employe,
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',

    },

    });

    Employe.hasMany(Contract, { foreignKey: 'employeId' });
    Contract.belongsTo(Employe, { foreignKey: 'employeId' });

module.exports = Contract;