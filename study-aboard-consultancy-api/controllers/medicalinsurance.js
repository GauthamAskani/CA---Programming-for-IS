const models = require('../models')
const moment = require('moment');

async function studentRequestMedicalInsurance(data) {

    try {
        const studentExists = await models.MedicalInsurance.findOne({
            where: { student_id: data.student_id }
        })
        if (studentExists) {
            throw new Error('Student has a open medical insurance request');
        }
        data.cover_start_date = moment(data.cover_start_date, 'MM-DD-YYYY').format('YYYY-MM-DD');
        data.cover_end_date = moment(data.cover_end_date, 'MM-DD-YYYY').format('YYYY-MM-DD');
        data.course_start_date = moment(data.course_start_date, 'MM-DD-YYYY').format('YYYY-MM-DD');
        data.course_end_date = moment(data.course_end_date, 'MM-DD-YYYY').format('YYYY-MM-DD');
        
        const result = await models.MedicalInsurance.create(data)
        console.log(result);
        return {
            medical_insurnace_id: result.medical_insurance_id
        };
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function updateMedicalInsuranceRequest(id, data) {
    try {
        data.cover_start_date = moment(data.cover_start_date, 'MM-DD-YYYY').format('YYYY-MM-DD');
        data.cover_end_date = moment(data.cover_end_date, 'MM-DD-YYYY').format('YYYY-MM-DD');
        data.course_start_date = moment(data.course_start_date, 'MM-DD-YYYY').format('YYYY-MM-DD');
        data.course_end_date = moment(data.course_end_date, 'MM-DD-YYYY').format('YYYY-MM-DD');
        const result = await models.MedicalInsurance.update(data, {
            where: { medical_insurance_id: id }
        });
        return result;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function deleteMedicalInsuranceRequest(id) {
    try {
        await models.MedicalInsurance.destroy({
            where: { medical_insurance_id: id }
        });
        return { message: 'Medical insurance request deleted successfully' };
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function getAllMedicalInsuranceRequests() {
    try {
        const medicalInsurances = await models.MedicalInsurance.findAll();
        return medicalInsurances;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = {
    studentRequestMedicalInsurance,
    updateMedicalInsuranceRequest,
    deleteMedicalInsuranceRequest,
    getAllMedicalInsuranceRequests
}