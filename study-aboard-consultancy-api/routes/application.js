const express = require('express');
const router = express.Router();
const Joi = require('joi');
const { createApplication } = require('../controllers/application');

const applicationSchema = Joi.object({
    student_id: Joi.number().integer().required(),
    university_id: Joi.number().integer().required(),
    course_id: Joi.number().integer().required(),
    student_notes: Joi.string().optional(),
    application_status: Joi.string().optional(),
    admin_remarks: Joi.string().optional(),
    application_created_at: Joi.date().default(() => new Date()),
    application_updated_at: Joi.date().optional(),
    application_deleted_at: Joi.date().optional()
});

router.post('/create-application', async (req, res) => {
    try {
        const { error, value } = applicationSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const application = await createApplication(value);
        res.status(201).json(application);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
