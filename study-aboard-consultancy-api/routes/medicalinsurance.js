const Joi = require('joi');
const { studentRequestMedicalInsurance } = require('../controllers/medicalinsurance');

const requestMedicalInsuranceDetailsSchema = Joi.object({
    student_id: Joi.number().integer().required(),
    cover_start_date: Joi.date().required(),
    cover_end_date: Joi.date().required(),
    destination_country: Joi.string().optional(),
    university_name: Joi.string().required(),
    course_title: Joi.string().required(),
    course_cost: Joi.number().integer().required(),
    course_start_date: Joi.date().required(),
    course_end_date: Joi.date().required(),
    student_notes: Joi.string().optional(),
    medical_insurance_created_at:Joi.date().default(() => new Date()),
});

async function requestMedicalInsurance(req, res) {
    try {
        let data = req.body
        const { error, value } = requestMedicalInsuranceDetailsSchema.validate(data);
        if (error) {
            throw new Error(error.details[0].message);
        }
        const result = await studentRequestMedicalInsurance(data);
        res.send(result);
    } catch(error) {
        res.statusCode = 400;
        res.send({
            error: error.message
        })
    }
}

module.exports = {
    requestMedicalInsurance
}