const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const client = sequelize.define('CompanyEmployeeRoles', {
        id :{
            type : Sequelize.INTEGER,
            allowNull : false,
            autoIncrement : true,
            primaryKey : true
        },
        startDate :{
            type : Sequelize.DATEONLY,
            allowNull : false
        },
        endDate : {
            type : Sequelize.DATEONLY,
            allowNull : false
        },
        duties : {
            type : Sequelize.TEXT,
            allowNull : false
        },
        isDeleted : {
            type : Sequelize.BOOLEAN,
            defaultValue : false
        }
        
    },
    {timestamps: false,freezeTableName: true, tableName: 'CompanyEmployeeRoles'}
);

module.exports=client;    