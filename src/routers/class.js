const express = require('express');
const router = express.Router();

const { adminAuthentication, teacherAuthentication } = require('../middleware/auth');

const classCtrl = require('../controller/class_controller'); 

//const cron = require('../util/cronhelper');

router.post('/class/create', adminAuthentication,classCtrl.createClass);

router.patch('/class/addStudent/:id', teacherAuthentication, classCtrl.addStudent);

router.delete('/class/removeStudent/:id', teacherAuthentication, classCtrl.removeStudent);

router.get("/class/getClass/:id", classCtrl.getClassDetail);

router.patch('/class/startClass/:id', teacherAuthentication, classCtrl.starClass);

module.exports = router;