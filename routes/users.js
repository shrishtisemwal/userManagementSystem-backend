const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/users');


router.post('/create',                     userCtrl.createUserProfile);
router.post('/update',                     userCtrl.updateUserProfile);
router.get('/list',                        userCtrl.getUserList);
router.get('/details',                     userCtrl.getUserDetail);
router.delete('/delete',                   userCtrl.deleteUserProfile);
router.post('/login',                      userCtrl.loginUser);

module.exports = router;