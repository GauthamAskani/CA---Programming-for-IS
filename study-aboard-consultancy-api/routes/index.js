const express = require('express');
const router = express.Router();
const { signupStudent } = require('./student')


router.post('/signup', signupStudent);


module.exports = router;