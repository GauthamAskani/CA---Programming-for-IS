const express = require('express');
const router = express.Router();
const { signupStudent, loginStudent } = require('./student')


router.post('/signup', signupStudent);
router.post('/login', loginStudent);


module.exports = router;