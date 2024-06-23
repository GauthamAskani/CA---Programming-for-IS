const express = require('express');
const router = express.Router();
const { getAllStudents } = require('../controllers/student');
const { getAllLoanRequests } = require('../controllers/loans');
const { getAllMedicalInsuranceRequests } = require('../controllers/medicalinsurance');

router.get('/admin/students-list', async (req, res) => {
    try {
        const students = await getAllStudents();
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/admin/loan-requests', async (req, res) => {
    try {
        const loans = await getAllLoanRequests();
        res.status(200).json(loans);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/admin/medicalinsurance-requests', async (req, res) => {
    try {
        const medicalInsurances = await getAllMedicalInsuranceRequests();
        res.status(200).json(medicalInsurances);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
