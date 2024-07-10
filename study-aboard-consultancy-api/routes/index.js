const express = require('express');
const router = express.Router();
const { signupStudent, loginStudent, handleForgotPassword, handleLostPasscode } = require('./student');
const { requestMedicalInsurance, handleUpdateMedicalInsuranceRequest, handleDeleteMedicalInsuranceRequest, handleGetMedicalInsuranceByStudentId, handleUpdateAdminRemarksAndStatus } = require('./medicalinsurance');
const { loanRequest, handleUpdateLoanRequest, handleDeleteLoanRequest, handleGetLoanDetailsByStudentId, handleUpdateAdminRemarksAndStatusLoan } = require('./loans');
const adminRoutes = require('./admin');
const applicationRoutes = require('./application');
const { validateToken } = require('../controllers/student');


router.post('/signup', signupStudent);
router.post('/login', loginStudent);
router.post('/lost-passcode', handleLostPasscode);
router.post('/forgot-password', handleForgotPassword);

router.post('/request-medical-insurnace', validateToken, requestMedicalInsurance);
router.post('/request-loan', validateToken, loanRequest);

router.put('/update-medical-insurance/:id', validateToken, handleUpdateMedicalInsuranceRequest);
router.delete('/delete-medical-insurance/:id', validateToken,  handleDeleteMedicalInsuranceRequest);

router.get('/medical-insurance/:student_id', handleGetMedicalInsuranceByStudentId);
router.put('/admin/update-medical-insurance/:id', validateToken, handleUpdateAdminRemarksAndStatus);

router.put('/update-loan/:id', validateToken, handleUpdateLoanRequest);
router.delete('/delete-loan/:id', validateToken, handleDeleteLoanRequest);

router.get('/loan-details/:student_id', handleGetLoanDetailsByStudentId);
router.put('/admin/update-loan/:id', validateToken, handleUpdateAdminRemarksAndStatusLoan);

router.use(adminRoutes);
router.use(applicationRoutes);

module.exports = router;