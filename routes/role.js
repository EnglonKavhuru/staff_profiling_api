const express = require('express');

const routersControllers = require('../controllers/roles');
const authMidlewareFunction= require('../midleware/auth');

const route = express.Router();
route.post('/', routersControllers.recordRoles);
route.put('/:id', routersControllers.updateRole);
route.delete('/:id', routersControllers.deleteRole);
route.get('/', routersControllers.getRoles);
route.get('/:id', routersControllers.getRole);
module.exports=route;


