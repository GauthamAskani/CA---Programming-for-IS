const Joi = require('joi');
const { studentLoanRequest, updateLoanRequest, deleteLoanRequest  } = require("../controllers/loans");

const loanRequestDetailsSchema = Joi.object({
    student_id: Joi.number().integer().required(),
    university_name: Joi.string().required(),
    course_title: Joi.string().required(),
    course_start_date: Joi.date().required(),
    loan_type: Joi.string().required(),
    loan_amount: Joi.number().integer().required(),
    notes: Joi.string().optional(),
    status: Joi.string().optional(),
    loan_request_created_at:Joi.date().default(() => new Date()),
});

const updateLoanRequestSchema = Joi.object({
    university_name: Joi.string().required(),
    course_title: Joi.string().required(),
    course_start_date: Joi.date().required(),
    loan_type: Joi.string().required(),
    loan_amount: Joi.number().integer().required(),
    notes: Joi.string().optional(),
    loan_request_updated_at: Joi.date().default(() => new Date()),
});

async function loanRequest(req, res) {
    try {
        let data = req.body
        const { error, value } = loanRequestDetailsSchema.validate(data);
        if (error) {
            throw new Error(error.details[0].message);
        }
        const result = await studentLoanRequest(data);
        res.send(result);
    } catch(error) {
        res.statusCode = 400;
        res.send({
            error: error.message
        })
    }
}

async function handleUpdateLoanRequest(req, res) {
    try {
        const { error, value } = updateLoanRequestSchema.validate(req.body);
        if (error) {
            throw new Error(error.details[0].message);
        }
        const result = await updateLoanRequest(req.params.id, value);
        res.send(result);
    } catch (error) {
        res.statusCode = 400;
        res.send({
            error: error.message
        });
    }
}

async function handleDeleteLoanRequest(req, res) {
    try {
        const result = await deleteLoanRequest(req.params.id);
        res.send(result);
    } catch (error) {
        res.statusCode = 400;
        res.send({
            error: error.message
        });
    }
}

module.exports = {
    loanRequest,
    handleUpdateLoanRequest,
    handleDeleteLoanRequest
}