const express = require('express');
const router = express.Router();
const { signupStudent, loginStudent } = require('./student');
const { requestMedicalInsurance } = require('./medicalinsurance');
const { loanRequest } = require('./loans');


router.post('/signup', signupStudent);
router.post('/login', loginStudent);

router.post('/request-medical-insurnace', requestMedicalInsurance);
router.post('/request-loan', loanRequest);


module.exports = router;