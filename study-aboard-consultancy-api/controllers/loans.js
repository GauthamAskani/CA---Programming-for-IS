const models = require('../models')
const moment = require('moment');

async function studentLoanRequest(data) {

    try {
        const studentExists = await models.Loan.findOne({
            where: { student_id: data.student_id }
        })
        if (studentExists) {
            throw new Error('Student has a open medical insurance request');
        }

        data.course_start_date = moment(data.course_start_date, 'MM-DD-YYYY').format('YYYY-MM-DD');
        
        const result = await models.Loan.create(data)
        return {
            loan_request_id: result.loan_request_id
        };
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = {
    studentLoanRequest,
}