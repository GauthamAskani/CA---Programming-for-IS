const express = require('express');
const router = express.Router();
const { signupStudent, loginStudent } = require('./student');
const { validateToken } = require("../controllers/student");
const { requestMedicalInsurance } = require('./medicalinsurance');



router.post('/signup', signupStudent);
router.post('/login', loginStudent);

router.post('/request-medical-insurnace', requestMedicalInsurance);


module.exports = router;