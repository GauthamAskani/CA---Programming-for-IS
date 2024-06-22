const models =  require('../models');
const bcrypt = require('bcryptjs');
const moment = require('moment');
const jwt = require('jsonwebtoken');

async function signup(data) {
    try {
        const studentExists = await models.Student.findOne({
            where: { student_email: data.student_email }
        })
        if (studentExists) {
            throw new Error('Student already registered');
        }
        data.student_dob = moment(data.student_dob, 'MM-DD-YYYY').format('YYYY-MM-DD');
        data.student_password = await bcrypt.hashSync(data.student_password, 10);
        const result = await models.Student.create(data)
        return {
            student_email: data.student_email
        };
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = {
    signup
}