'use strict';

/** @type {import('sequelize-cli').Migration} */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('MedicalInsurances', {
      medical_insurance_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      student_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Students',
          key: 'student_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      cover_start_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      cover_end_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      destination_country: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      university_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      course_title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      course_cost: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      course_start_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      course_end_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      student_notes: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      admin_remarks: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      medical_insurance_created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      medical_insurance_updated_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      medical_insurance_deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('MedicalInsurances');
  }
};

