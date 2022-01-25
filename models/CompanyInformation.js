const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const client = sequelize.define('CompanyInformation', {
        id :{
                type : Sequelize.INTEGER,
                allowNull : false,
                autoIncrement : true,
                primaryKey : true
            },
        companyName : {
            type : Sequelize.STRING
        },
        companyRegNo :{
            type : Sequelize.STRING,
            unique : true
        },
        companyAddress :{
            type : Sequelize.STRING,
        }
        ,
        ContactPerson:{
            type : Sequelize.STRING,
        },
        companyEmail : {
            type : Sequelize.STRING
        }, 
        isDeleted :{
            type : Sequelize.INTEGER,
            defaultValue : false
        },
        isApproved :{
            type : Sequelize.INTEGER,
            defaultValue : false
        } 

    }, 
    {timestamps: false,freezeTableName: true, tableName: 'CompanyInformation'}
);
module.exports=client;    