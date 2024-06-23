const express = require('express');
const router = express.Router();
const { signupStudent, loginStudent } = require('./student');
const { requestMedicalInsurance, handleUpdateMedicalInsuranceRequest, handleDeleteMedicalInsuranceRequest } = require('./medicalinsurance');
const { loanRequest, handleUpdateLoanRequest, handleDeleteLoanRequest } = require('./loans');


router.post('/signup', signupStudent);
router.post('/login', loginStudent);

router.post('/request-medical-insurnace', requestMedicalInsurance);
router.post('/request-loan', loanRequest);

router.put('/update-medical-insurance/:id', handleUpdateMedicalInsuranceRequest);
router.delete('/delete-medical-insurance/:id', handleDeleteMedicalInsuranceRequest);

router.put('/update-loan/:id', handleUpdateLoanRequest);
router.delete('/delete-loan/:id', handleDeleteLoanRequest);


module.exports = router;