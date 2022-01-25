const bcrypt = require(('bcryptjs'));
const jwt = require('jsonwebtoken');
const Op = require('sequelize').Op;
const moment = require('moment');
var io = require('socket.io-client');
const nodemailer = require("nodemailer");
const sequelize = require('sequelize')
const excel = require('exceljs');


//IMPORTING DATABASE TABLE
const company = require('../models/CompanyInformation');


exports.recordCompany = (req, res, next) =>{
    const data ={
        companyName : req.body.name,
        companyRegNo : req.body.regNumber,
        companyAddress : req.body.address,
        ContactPerson : req.body.contactNumber,
        companyEmail :req.body.email,
    }
    company.create(data).then(result =>{
        res.status(201).json({res:"Record was created successfully"});
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({res :'There are errors, not created!'});
    }) 
}

exports.updateCompany = (req, res, next) =>{
    const data ={
        companyName : req.body.name,
        companyRegNo : req.body.regNumber,
        companyAddress : req.body.address,
        ContactPerson : req.body.contactNumber,
        companyEmail :req.body.email,
    }
    company.update(data, {where : {id : req.params.id}})
        .then(result =>{
            res.status(200).json({res : 'Updated successfully!!!'});
        }).catch(error =>{
            res.status(500).json({res : 'Server error!!!'});
        })
}

exports.deleteCompany = (req, res, next) =>{
    company.update({isDeleted : true}, {where : {id : req.params.id}})
        .then(result =>{
            res.status(200).json({res : 'Deleted successfully!!!'});
        }).catch(error =>{
            res.status(500).json({res : 'Server error!!!'});
        })
}

exports.getCompany = (req, res, next) =>{
    company.findAll({where : {isDeleted : false, id : req.params.id}}).then(result =>{
        res.status(200).json(result);        
    }).catch(error =>{
        res.status(500).json(error);
        console.log(error);
    })
}

exports.getCompanyies = (req, res, next) =>{
    company.findAll({where : {isDeleted : false}}).then(result =>{
        res.status(200).json(result);        
    }).catch(error =>{
        res.status(500).json(error);
        console.log(error);
    })
}