const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/users');


router.post('/create',                     userCtrl.createUserProfile);
router.put('/update',                      userCtrl.updateUserProfile);
router.get('/list',                        userCtrl.getUserList);
router.get('/details',                     userCtrl.getUserDetail);
router.post('/delete',                     userCtrl.deleteUserProfile);
router.post('/login',                      userCtrl.loginUser);

module.exports = router;