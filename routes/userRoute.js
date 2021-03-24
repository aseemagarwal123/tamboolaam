const express = require('express');
const router = express.Router();

const {userSignup, userLogin, deleteUser, sendOTP, verifyOTP} = require('../controllers/userController');

router.post('/signup',userSignup);

router.post('/login', userLogin);

router.delete('/:userId', deleteUser);

router.post('/sendotp', sendOTP);

router.post('/verifyotp', verifyOTP);

module.exports = router;