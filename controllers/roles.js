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
const roles = require('../models/EmployeeRoles');


exports.recordRoles = (req, res, next) =>{
    const data ={
        duties : req.body.duties,
        startDate : req.body.start,
        endDate : req.body.end,
        employeeId :req.body.employeeID,
        companyId : req.body.companyID
    }
    roles.create(data).then(result =>{
        res.status(201).json({res:"Record was created successfully"});
    }).catch(error => {
        console.log(error)
        res.status(500).json({res :'There are errors, Record not created!'});
    }) 
}

exports.getRoles = (req, res, next) =>{
    roles.findAll({where : { [Op.or] :{companyId: req.query.companyID, employeeId : req.query.employeeID }, isDeleted : false}}).then(result =>{
        res.status(200).json(result);
    }).catch(error =>{
        res.status(500).json(error);
        console.log(error);
    })
}


exports.getRole = (req, res, next) =>{
    roles.findAll({where : {isDeleted : false, id : req.params.id}}).then(result =>{
        res.status(200).json(result);
    }).catch(error =>{
        res.status(500).json(error);
        console.log(error);
    })
}

exports.updateRole = (req, res, next) =>{
    var data = req.body;
    roles.update(data, {where : {id : req.params.id}})
        .then(result =>{
            res.status(200).json({res : 'Updated successfully!!!'});
        }).catch(error =>{
            console.log(error)
            res.status(500).json({res : 'Server error!!!'});
        })
}

exports.deleteRole = (req, res, next) =>{
    roles.update({isDeleted : true}, {where : {id : req.params.id}})
        .then(result =>{
            res.status(200).json({res : 'Deleted successfully!!!'});
        }).catch(error =>{
            res.status(500).json({res : 'Server error!!!'});
        })
}
