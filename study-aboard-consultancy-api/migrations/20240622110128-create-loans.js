'use strict';

/** @type {import('sequelize-cli').Migration} */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Loans', {
      loan_request_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      student_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Students', // Name of the table (not the model) that student_id is referencing
          key: 'student_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      university_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      course_title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      course_start_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      loan_type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      loan_amount: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      notes: {
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
      loan_request_created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      loan_request_updated_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      loan_request_deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Loans');
  }
};

