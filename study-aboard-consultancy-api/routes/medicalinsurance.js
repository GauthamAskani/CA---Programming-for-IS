const Joi = require('joi');
const { studentRequestMedicalInsurance, updateMedicalInsuranceRequest, deleteMedicalInsuranceRequest, getMedicalInsuranceByStudentId, updateAdminRemarksAndStatus } = require('../controllers/medicalinsurance');

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
    status: Joi.string().optional(),
    medical_insurance_created_at:Joi.date().default(() => new Date()),
});

const updateMedicalInsuranceRequestSchema = Joi.object({
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
    medical_insurance_updated_at: Joi.date().default(() => new Date()),
});

const updateAdminRemarksAndStatusSchema = Joi.object({
    admin_remarks: Joi.string().optional(),
    status: Joi.string().optional(),
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

async function handleUpdateMedicalInsuranceRequest(req, res) {
    try {
        const { error, value } = updateMedicalInsuranceRequestSchema.validate(req.body);
        if (error) {
            throw new Error(error.details[0].message);
        }
        const result = await updateMedicalInsuranceRequest(req.params.id, value);
        res.send(result);
    } catch (error) {
        res.statusCode = 400;
        res.send({
            error: error.message
        });
    }
}

async function handleDeleteMedicalInsuranceRequest(req, res) {
    try {
        const result = await deleteMedicalInsuranceRequest(req.params.id);
        res.send(result);
    } catch (error) {
        res.statusCode = 400;
        res.send({
            error: error.message
        });
    }
}

async function handleGetMedicalInsuranceByStudentId(req, res) {
    try {
        const { student_id } = req.params;
        const result = await getMedicalInsuranceByStudentId(student_id);
        if (!result.length) {
            return res.status(404).json({ error: 'No medical insurance found for this student' });
        }
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function handleUpdateAdminRemarksAndStatus(req, res) {
    try {
        const { error, value } = updateAdminRemarksAndStatusSchema.validate(req.body);
        if (error) {
            throw new Error(error.details[0].message);
        }
        const result = await updateAdminRemarksAndStatus(req.params.id, value);
        res.send(result);
    } catch (error) {
        res.statusCode = 400;
        res.send({
            error: error.message
        });
    }
}

module.exports = {
    requestMedicalInsurance,
    handleUpdateMedicalInsuranceRequest,
    handleDeleteMedicalInsuranceRequest,
    handleGetMedicalInsuranceByStudentId,
    handleUpdateAdminRemarksAndStatus
}