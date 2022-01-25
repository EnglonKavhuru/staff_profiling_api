const express = require('express');

const routersControllers = require('../controllers/company');
const authMidlewareFunction= require('../midleware/auth');

const route = express.Router();

route.post('/', routersControllers.recordCompany);
route.put('/:id', routersControllers.updateCompany);
route.delete('/:id', routersControllers.deleteCompany);
route.get('/', routersControllers.getCompanyies);
route.get('/:id', routersControllers.getCompany);

module.exports=route;


