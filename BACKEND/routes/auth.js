const express = require('express');
const router = express.Router();
const { registerUser, loginUser, requestOtp, verifyOtp } = require('../controllers/authController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/request-otp', requestOtp);
router.post('/verify-otp', verifyOtp);

module.exports = router;
