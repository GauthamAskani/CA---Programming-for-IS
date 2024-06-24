const express = require('express');
const router = express.Router();
const { getAllStudents } = require('../controllers/student');
const { getAllLoanRequests } = require('../controllers/loans');
const { getAllMedicalInsuranceRequests } = require('../controllers/medicalinsurance');

const { createUniversity } = require('../controllers/university');

// Joi validation schema for creating a university
const universitySchema = Joi.object({
    university_name: Joi.string().required(),
    university_shortname: Joi.string().required(),
    university_description: Joi.string().required(),
    university_image_url: Joi.string().optional(),
    university_program_intake: Joi.string().required(),
    university_program_intake_status: Joi.string().required(),
    university_created_at: Joi.date().default(() => new Date()),
    university_updated_at: Joi.date().optional(),
    university_deleted_at: Joi.date().optional()
});

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

router.post('/admin/create-university', async (req, res) => {
    try {
        const { error, value } = universitySchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const university = await createUniversity(value);
        res.status(201).json(university);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
