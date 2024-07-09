const express = require('express');
const router = express.Router();
const { signupStudent, loginStudent, handleForgotPassword, handleLostPasscode} = require('./student');
const { requestMedicalInsurance, handleUpdateMedicalInsuranceRequest, handleDeleteMedicalInsuranceRequest, handleGetMedicalInsuranceByStudentId, handleUpdateAdminRemarksAndStatus } = require('./medicalinsurance');
const { loanRequest, handleUpdateLoanRequest, handleDeleteLoanRequest } = require('./loans');
const adminRoutes = require('./admin');
const applicationRoutes = require('./application');


router.post('/signup', signupStudent);
router.post('/login', loginStudent);
router.post('/lost-passcode', handleLostPasscode);
router.post('/forgot-password', handleForgotPassword);

router.post('/request-medical-insurnace', requestMedicalInsurance);
router.post('/request-loan', loanRequest);

router.put('/update-medical-insurance/:id', handleUpdateMedicalInsuranceRequest);
router.delete('/delete-medical-insurance/:id', handleDeleteMedicalInsuranceRequest);

router.get('/medical-insurance/:student_id', handleGetMedicalInsuranceByStudentId);
router.put('/admin/update-medical-insurance/:id', handleUpdateAdminRemarksAndStatus);

router.put('/update-loan/:id', handleUpdateLoanRequest);
router.delete('/delete-loan/:id', handleDeleteLoanRequest);

router.use(adminRoutes);
router.use(applicationRoutes);

module.exports = router;
