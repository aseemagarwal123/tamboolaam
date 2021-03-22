const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/userModel');

const userController = require('../controllers/userController');

router.post('/signup',userController.user_signUp);

router.post('/login', userController.user_login);

router.delete('/:userId', userController.deleleUser);

module.exports = router;