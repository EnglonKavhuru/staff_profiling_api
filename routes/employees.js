const express = require('express');

const routersControllers = require('../controllers/employees');
const authMidlewareFunction= require('../midleware/auth');

const route = express.Router();
route.post('/', routersControllers.recordEmployees);
route.put('/:id', routersControllers.updateEmployee);
route.delete('/:id', routersControllers.deleteEmployee);
route.get('/', routersControllers.getEmployees);
route.get('/:id', routersControllers.getEmployee);
module.exports=route;


