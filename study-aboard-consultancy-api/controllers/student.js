const models =  require('../models');
const bcrypt = require('bcryptjs');
const moment = require('moment');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
require('dotenv').config();

function generatePasscode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

async function sendEmail(to, subject, text) {
  let transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
      }
  });

  let info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: to,
      subject: subject,
      text: text
  });

  console.log('Message sent: %s', info.messageId);
}

async function signup(data) {
  try {
      const studentExists = await models.Student.findOne({
          where: { student_email: data.student_email }
      });
      if (studentExists) {
          throw new Error('Student already registered');
      }
      data.student_dob = moment(data.student_dob, 'MM-DD-YYYY').format('MM-DD-YYYY');
      data.student_password = await bcrypt.hashSync(data.student_password, 10);
      
      const passcode = generatePasscode();
      data.passcode = passcode;

      const result = await models.Student.create(data);

      await sendEmail(data.student_email, 'Student Account Creation Successful !', `Hi, Thanks for Choosing StudyAboardConsultancy. Please find the 6 digit Passcode for login: ${passcode} Thank you!`);

      return {
          message: 'Student Sign Up Successful'
      };
  } catch (error) {
      console.log(error);
      throw error;
  }
}

async function lostPasscode(data) {
  try {
      const student = await models.Student.findOne({
          where: { student_email: data.student_email }
      });
      if (!student) {
          throw new Error('Student not found');
      }

      const passcode = generatePasscode();
      await student.update({ passcode: passcode });

      await sendEmail(data.student_email, 'Study Aboard Consultancy - New Passcode', `Hi, Please find the new 6 digit Passcode: ${passcode}`);

      return { message: 'New passcode sent to your email' };
  } catch (error) {
      console.log(error);
      throw error;
  }
}

async function forgotPassword(data) {
  try {
      const student = await models.Student.findOne({
          where: {
              student_email: data.student_email,
              passcode: data.passcode
          }
      });
      if (!student) {
          throw new Error('Invalid email or passcode');
      }

      const newPassword = await bcrypt.hashSync(data.new_password, 10);
      await student.update({ student_password: newPassword, passcode: null });

      return { message: 'Password updated successfully' };
  } catch (error) {
      console.log(error);
      throw error;
  }
}

async function login(data) {
  try {
      const studentExists = await models.Student.findOne({
          where: { student_email: data.student_email }
      });
      if (!studentExists) {
          return {
              statusCode: 401,
              message: {
                  message: 'We were unable to find student for this email. Please SignUp!'
              }
          };
      }
      if (studentExists) {
          if (await bcrypt.compare(data.student_password, studentExists.student_password)) {
              if (studentExists.passcode === data.passcode) {
                  const token = jwt.sign({ sub: studentExists.student_id }, process.env.SECRET, {
                      expiresIn: '7d'
                  });

                  return {
                      statusCode: 200,
                      message: {
                          message: 'Student Login successful',
                          token: token,
                          ...omitPassword(studentExists.get())
                      }
                  };
              } else {
                  return {
                      statusCode: 401,
                      message: {
                          error: 'Invalid passcode'
                      }
                  };
              }
          } else {
              return {
                  statusCode: 401,
                  message: {
                      error: 'Authentication failed'
                  }
              };
          }
      }
  } catch (error) {
      console.log(error);
      throw error;
  }
}

function omitPassword(student) {
  const { student_password,passcode, ...studentWithoutPassword } = student;
  return studentWithoutPassword;
}

async function getAllStudents() {
  try {
      const students = await models.Student.findAll({
          where: {
              role: 'Student'
          }
      });

      const result = students.map(ele => {
        return {
          ...omitPassword(ele.get())
        }
      })

      return result;
  } catch (error) {
      console.log(error);
      throw error;
  }
}

module.exports = {
  signup,
  login,
  lostPasscode,
  forgotPassword,
  getAllStudents
};
