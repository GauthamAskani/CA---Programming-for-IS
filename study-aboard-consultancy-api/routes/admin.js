const express = require('express');
const router = express.Router();
const Joi = require('joi');
const { getAllStudents } = require('../controllers/student');
const { getAllLoanRequests } = require('../controllers/loans');
const { getAllMedicalInsuranceRequests } = require('../controllers/medicalinsurance');
const { createUniversity, updateUniversity, deleteUniversity, getAllUniversities } = require('../controllers/university');
const { createCourse, updateCourse, deleteCourse, getCoursesByUniversity } = require('../controllers/course');
const { createBroadcast, updateBroadcast } = require('../controllers/broadcast');

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

const updateUniversitySchema = Joi.object({
    university_name: Joi.string().required(),
    university_shortname: Joi.string().required(),
    university_description: Joi.string().required(),
    university_image_url: Joi.string().optional(),
    university_program_intake: Joi.string().required(),
    university_program_intake_status: Joi.string().required(),
    university_updated_at: Joi.date().default(() => new Date()),
    university_deleted_at: Joi.date().optional()
});

const courseSchema = Joi.object({
    university_id: Joi.number().integer().required(),
    course_name: Joi.string().required(),
    course_main_entry_requirements: Joi.string().required(),
    undergraduate_score_cgpa: Joi.string().optional(),
    undergraduate_score_percent: Joi.string().optional(),
    undergraduate_score: Joi.string().optional(),
    score_twelfth: Joi.string().optional(),
    fifteen_years_allowed: Joi.string().optional(),
    ielts: Joi.string().optional(),
    tofel: Joi.string().optional(),
    pte: Joi.string().optional(),
    duolingo: Joi.string().optional(),
    gmat_score: Joi.string().optional(),
    gre_score: Joi.string().optional(),
    course_degree: Joi.string().optional(),
    course_duration: Joi.string().optional(),
    total_tuition_fee: Joi.string().optional(),
    application_fee: Joi.string().optional(),
    course_intake: Joi.string().optional(),
    course_intake_status: Joi.string().optional(),
    course_notes: Joi.string().optional(),
    course_created_at: Joi.date().default(() => new Date()),
    course_updated_at: Joi.date().optional(),
    course_deleted_at: Joi.date().optional()
});

const updateCourseSchema = Joi.object({
    university_id: Joi.number().integer().required(),
    course_name: Joi.string().required(),
    course_main_entry_requirements: Joi.string().required(),
    undergraduate_score_cgpa: Joi.string().optional(),
    undergraduate_score_percent: Joi.string().optional(),
    undergraduate_score: Joi.string().optional(),
    score_twelfth: Joi.string().optional(),
    fifteen_years_allowed: Joi.string().optional(),
    ielts: Joi.string().optional(),
    tofel: Joi.string().optional(),
    pte: Joi.string().optional(),
    duolingo: Joi.string().optional(),
    gmat_score: Joi.string().optional(),
    gre_score: Joi.string().optional(),
    course_degree: Joi.string().optional(),
    course_duration: Joi.string().optional(),
    total_tuition_fee: Joi.string().optional(),
    application_fee: Joi.string().optional(),
    course_intake: Joi.string().optional(),
    course_intake_status: Joi.string().optional(),
    course_notes: Joi.string().optional(),
    course_updated_at: Joi.date().default(() => new Date()),
    course_deleted_at: Joi.date().optional()
});

const broadcastSchema = Joi.object({
    broadcast_title: Joi.string().required(),
    broadcast_image_url: Joi.string().required(),
    broadcast_message: Joi.string().required(),
    broadcast_send_date: Joi.date().required(),
    broadcast_expiry_date: Joi.date().required(),
    broadcast_created_at: Joi.date().default(() => new Date()),
    broadcast_updated_at: Joi.date().optional(),
    broadcast_deleted_at: Joi.date().optional()
});

const updateBroadcastSchema = Joi.object({
    broadcast_title: Joi.string().required(),
    broadcast_image_url: Joi.string().required(),
    broadcast_message: Joi.string().required(),
    broadcast_send_date: Joi.date().required(),
    broadcast_expiry_date: Joi.date().required(),
    broadcast_updated_at: Joi.date().default(() => new Date()),
    broadcast_deleted_at: Joi.date().optional()
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

router.put('/admin/update-university/:id', async (req, res) => {
    try {
        const { error, value } = updateUniversitySchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const result = await updateUniversity(req.params.id, value);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.delete('/admin/delete-university/:id', async (req, res) => {
    try {
        const result = await deleteUniversity(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/admin/create-course', async (req, res) => {
    try {
        const { error, value } = courseSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const course = await createCourse(value);
        res.status(201).json(course);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.put('/admin/update-course/:id', async (req, res) => {
    try {
        const { error, value } = updateCourseSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const result = await updateCourse(req.params.id, value);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.delete('/admin/delete-course/:id', async (req, res) => {
    try {
        const result = await deleteCourse(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/admin/universities', async (req, res) => {
    try {
        const universities = await getAllUniversities();
        res.status(200).json(universities);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/admin/university/:id/courses', async (req, res) => {
    try {
        const courses = await getCoursesByUniversity(req.params.id);
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/admin/create-broadcast', async (req, res) => {
    try {
        const { error, value } = broadcastSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const broadcast = await createBroadcast(value);
        res.status(201).json(broadcast);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.put('/admin/update-broadcast/:id', async (req, res) => {
    try {
        const { error, value } = updateBroadcastSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const result = await updateBroadcast(req.params.id, value);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
