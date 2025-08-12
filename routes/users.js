const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/users');


router.post('/create',                 userCtrl.createUserProfile);

module.exports = router;