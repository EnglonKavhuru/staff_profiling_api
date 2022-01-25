const bcrypt = require(('bcryptjs'));
const jwt = require('jsonwebtoken');
const Op = require('sequelize').Op;
const moment = require('moment');
var io = require('socket.io-client');
const nodemailer = require("nodemailer");
const sequelize = require('sequelize')
const excel = require('exceljs');
var pdf = require("pdf-creator-node");
var fs = require('fs');

//IMPORTING DATABASE TABLE
const employees = require('../models/EmployeeDetails');
const departments = require('../models/CompanyDepartments');
const roles = require('../models/EmployeeRoles');


exports.recordEmployees = (req, res, next) =>{
    const data ={
        name : req.body.name,
        idNumber : req.body.nationalID,
        email : req.body.email,
        phone :req.body.phone,
        password :req.body.password,
        departmentId :req.body.departmentID,
        companyId : req.body.companyID
    }
    employees.create(data).then(result =>{
        res.status(201).json({res:"Record was created successfully"});
    }).catch(error => {
        console.log(error)
        res.status(500).json({res :'There are errors, Record not created!'});
    }) 
}

exports.getEmployees = (req, res, next) =>{
    employees.findAll({where : {isDeleted : false, companyId : req.query.companyID},include : [{model: departments},{model: roles}]}).then(result =>{
        res.status(200).json(result);
    }).catch(error =>{
        res.status(500).json(error);
        console.log(error);
    })
}


exports.getEmployee = (req, res, next) =>{
    employees.findAll({where : {isDeleted : false, id : req.params.id},include : [{model: departments},{model: roles}]}).then(result =>{
        res.status(200).json(result);
    }).catch(error =>{
        res.status(500).json(error);
        console.log(error);
    })
}

exports.updateEmployee = (req, res, next) =>{
    const data ={
        name : req.body.name,
        idNumber : req.body.nationalID,
        email : req.body.email,
        phone :req.body.phone,
        password :req.body.password,
        departmentId :req.body.departmentID,
        companyId : req.body.companyID
    }
    employees.update(data, {where : {id : req.params.id}})
        .then(result =>{
            res.status(200).json({res : 'Updated successfully!!!'});
        }).catch(error =>{
            console.log(error)
            res.status(500).json({res : 'Server error!!!'});
        })
}

exports.deleteEmployee = (req, res, next) =>{
    employees.update({isDeleted : true}, {where : {id : req.params.id}})
        .then(result =>{
            res.status(200).json({res : 'Deleted successfully!!!'});
        }).catch(error =>{
            res.status(500).json({res : 'Server error!!!'});
        })
}
