'use strict';

/** @type {import('sequelize-cli').Migration} */
'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('students', {
      student_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      student_first_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      student_family_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      student_dob: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      student_gender: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      student_country_origin: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      student_phone_number: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      student_email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      student_password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      student_status: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      student_document_status: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      role: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      passcode: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      student_created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      student_updated_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      student_deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('students');
  }
};

