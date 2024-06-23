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

async function login(data) {
    try {
        const studentExists = await models.Student.findOne({
            where: { student_email: data.student_email }
        })
        if (!studentExists) {
            return {
                statusCode: 401,
                message: {
                  message: "We were unable to find student for this email. Please SignUp!"
                }
              };
        }
        if (studentExists) {
            if (await bcrypt.compare(data.student_password, studentExists.student_password)) {
              const token = jwt.sign({ sub: studentExists.student_id }, process.env.secret, {
                expiresIn: "7d",
              });

              return {
                statusCode: 200,
                message: {
                  message: "Student Login successful",
                  token: token,
                  ...omitPassword(studentExists.get())
                }
              };
            } else {
              return {
                statusCode: 401,
                message: {
                  error: "Authentication failed"
                }
              };
            }
          } else {
            return {
              statusCode: 401,
              message: {
                error: "Authentication failed"
              }
            };
          }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

function omitPassword(student) {
    const { student_password, ...studentWithoutPassword } = student;
    return studentWithoutPassword;
}

async function getAllStudents() {
  try {
      const students = await models.Student.findAll();
      return students;
  } catch (error) {
      console.log(error);
      throw error;
  }
}

module.exports = {
    signup,
    login,
    getAllStudents
}