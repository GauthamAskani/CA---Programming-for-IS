const Joi = require('joi');
const { studentLoanRequest } = require("../controllers/loans");

const loanRequestDetailsSchema = Joi.object({
    student_id: Joi.number().integer().required(),
    university_name: Joi.string().required(),
    course_title: Joi.string().required(),
    course_start_date: Joi.date().required(),
    loan_type: Joi.string().required(),
    loan_amount: Joi.number().integer().required(),
    notes: Joi.string().optional(),
    admin_remarks: Joi.string().optional(),
    status: Joi.string().optional(),
    loan_request_created_at:Joi.date().default(() => new Date()),
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

module.exports = {
    loanRequest
}