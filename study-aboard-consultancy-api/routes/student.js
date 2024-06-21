const express = require('express');
const router = express.Router();
const { Student } = require('../models');
const Joi = require('joi');
const moment = require('moment');

// Joi validation schema
const studentSchema = Joi.object({
  student_first_name: Joi.string().required(),
  student_family_name: Joi.string().required(),
  student_dob: Joi.date().required(),
  student_gender: Joi.string().required(),
  student_country_origin: Joi.string().optional(),
  student_phone_number: Joi.string().required(),
  student_email: Joi.string().email().required(),
  student_password: Joi.string().required(),
  student_status: Joi.string().optional(),
  student_document_status: Joi.string().optional(),
  student_created_at: Joi.date().default(() => new Date()),
  student_updated_at: Joi.date().optional(),
  student_deleted_at: Joi.date().optional()
});

// Student signup route
router.post('/studentSignup', async (req, res) => {
  try {
    // Validate the request body against the schema
    const { error, value } = studentSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Format the date before saving
    value.student_dob = moment(value.student_dob, 'MM-DD-YYYY').format('YYYY-MM-DD');

    // Create the student in the database
    const student = await Student.create(value);
    res.status(201).json(student);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
