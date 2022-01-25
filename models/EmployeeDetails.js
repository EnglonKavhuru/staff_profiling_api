const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const client = sequelize.define('CompanyEmployees', {
        id :{
            type : Sequelize.INTEGER,
            allowNull : false,
            autoIncrement : true,
            primaryKey : true
        },
        name :{
            type : Sequelize.TEXT,
            allowNull : false
        },
        idNumber : {
            type : Sequelize.STRING,
            allowNull : false
        },
        email : {
            type :Sequelize.STRING,
        },
        phone :{
            type : Sequelize.STRING,
        },
        password :{
            type : Sequelize.STRING,
            allowNull : false
        },
        isDeleted : {
            type : Sequelize.BOOLEAN,
            defaultValue : false
        }
        
    },
    {timestamps: false,freezeTableName: true, tableName: 'CompanyEmployees'}
);

module.exports=client;    