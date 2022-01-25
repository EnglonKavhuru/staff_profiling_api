const Sequelize = require('sequelize');
const sequelize = require('../utils/database');
const client = sequelize.define('CompanyDepartments', {
        id :{
            type : Sequelize.INTEGER,
            allowNull : false,
            autoIncrement : true,
            primaryKey : true
        },
        name :{
            type : Sequelize.INTEGER,
            allowNull : false 
        },
        isDeleted : {
            type : Sequelize.BOOLEAN,
            defaultValue : false
        }
        
    },
    {timestamps: false,freezeTableName: true, tableName: 'CompanyDepartments'}
);

module.exports=client;    

