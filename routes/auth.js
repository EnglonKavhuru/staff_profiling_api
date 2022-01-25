const express = require('express');

const routersControllers = require('../controllers/auth');

const route = express.Router();

//route.get('/xero', routersControllers.xeroDone);

module.exports=route;

//HIVELINK AUTH GETWAY
route.get('/integrate', routersControllers.userAuthIntergration);

//Developer auth
route.get('/developer/:username', routersControllers.developerAuth);
