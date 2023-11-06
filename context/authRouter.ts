const express = require('express');

const router = express.Router();

const path = require('path');

const authController = require('../controllers/auth.controller');

router.get('/login', authController.goToLoginPage);

module.exports = router
