const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/student')

const Joi = require('joi');

const signupStudentSchema = Joi.object({
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
});

const loginStudentSchema = Joi.object({
    student_email: Joi.string().email().required(),
    student_password: Joi.string().required()
  });

async function signupStudent(req, res) {
    try {
        const data = req.body;
        const { error, value } = signupStudentSchema.validate(data);
        if (error) {
            throw new Error(error.details[0].message);
        }
        const result = await signup(data);
        res.status(result.statusCode || 200);
        res.send(result.message || result);
    } catch (error) {
        res.statusCode = 400;
        res.send({
            error: error.message
        })
    }
}


async function loginStudent(req, res) {
    try {
        const data = req.body;
        const { error, value } = loginStudentSchema.validate(data);
        if (error) {
            throw new Error(error.details[0].message);
        }
        const result = await login(data);
        res.status(result.statusCode || 200);
        res.send(result.message || result);
    } catch (error) {
        res.statusCode = 400;
        res.send({
            error: error.message
        })
    }
}


module.exports = exports = {
    signupStudent,
    loginStudent
};