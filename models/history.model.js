const { Model, DataTypes } = require('sequelize')
const sequelize = require('./sequelize')

class History extends Model {}

Model.init({
    id:{ 
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    totalplay:{
        type: DataTypes.INTEGER
    },
    win:{
        type: DataTypes.INTEGER
    },
    draw:{
        type: DataTypes.INTEGER
    },
    lose:{
        type: DataTypes.INTEGER
    },

}, {
    sequelize,
    tableName: 'history',
    timestamps: false,
})

module.exports = History