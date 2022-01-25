// const Sequelize = require('sequelize');

// var mysql = require('mysql');


// const sequelize = new Sequelize('gob9xjw7_new_ams','gob9xjw7r76x','7]V=?f(B.a4/K@m',{dialect : 'mysql', host : 'localhost'});


// module.exports = sequelize;//to make the object accessible by other packages


const Sequelize = require('sequelize');

var mysql = require('mysql');

const sequelize = new Sequelize('StaffProfilingApp','root','',{dialect : 'mysql', host : 'localhost'});


module.exports = sequelize;//to make the object accessible by other packages