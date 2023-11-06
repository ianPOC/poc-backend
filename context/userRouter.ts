const express = require('express');

const router = express.Router();

const path = require('path');

const userController = require('../controllers/user.controller');

router.get('/', userController.goToHomePage);

router.get('/add-user', userController.goToAddUserPage);

router.post('/add-user', userController.addUser);

router.get('/users', userController.getUsers);

router.get('/user/:id', userController.getSelectedUser);

router.post('/delete-user/:id', userController.deleteUser);

router.get('/edit-user/:id', userController.goToEditUserPage);

router.post('/edit-user/:id', userController.editUser);

module.exports = router
