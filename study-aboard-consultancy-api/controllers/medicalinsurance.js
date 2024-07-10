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
        data.cover_start_date = moment(data.cover_start_date, 'MM-DD-YYYY').format('MM-DD-YYYY');
        data.cover_end_date = moment(data.cover_end_date, 'MM-DD-YYYY').format('MM-DD-YYYY');
        data.course_start_date = moment(data.course_start_date, 'MM-DD-YYYY').format('MM-DD-YYYY');
        data.course_end_date = moment(data.course_end_date, 'MM-DD-YYYY').format('MM-DD-YYYY');
        
        const result = await models.MedicalInsurance.create(data)
        return (result);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function updateMedicalInsuranceRequest(id, data) {
    try {
        data.cover_start_date = moment(data.cover_start_date, 'MM-DD-YYYY').format('MM-DD-YYYY');
        data.cover_end_date = moment(data.cover_end_date, 'MM-DD-YYYY').format('MM-DD-YYYY');
        data.course_start_date = moment(data.course_start_date, 'MM-DD-YYYY').format('MM-DD-YYYY');
        data.course_end_date = moment(data.course_end_date, 'MM-DD-YYYY').format('MM-DD-YYYY');
        const result = await models.MedicalInsurance.update(data, {
            where: { medical_insurance_id: id }
        });
        return {
            message: "Medical Insurnace Details are updated Successfully"
        };
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

async function getMedicalInsuranceByStudentId(student_id) {
    try {
        const medicalInsurance = await models.MedicalInsurance.findAll({
            where: { student_id: student_id }
        });
        return medicalInsurance;
    } catch (error) {
        console.log(error);
        throw error;
    }
}


async function updateAdminRemarksAndStatus(id, data) {
    try {
        const result = await models.MedicalInsurance.update(data, {
            where: { medical_insurance_id: id }
        });
        return {
            message: "Medical Insurnace Status & Remarks Updated Successfully"
        };
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = {
    studentRequestMedicalInsurance,
    updateMedicalInsuranceRequest,
    deleteMedicalInsuranceRequest,
    getAllMedicalInsuranceRequests,
    getMedicalInsuranceByStudentId,
    updateAdminRemarksAndStatus
}