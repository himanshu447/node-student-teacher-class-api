const express = require('express');
const { authMiddleWare } = require('../middleware/auth');
const registerUser = require('../services/user_services');
const router = express.Router();

const userCtrl = require('../controller/user_controller');


router.post('/user/create',authMiddleWare,userCtrl.createUser);

router.post('/user/login', userCtrl.loginUser);

router.post('/user/logout', authMiddleWare, userCtrl.logout);

router.post('/user/logoutAll', authMiddleWare, userCtrl.logoutAll);

module.exports = router;

