'use strict';

/** @type {import('sequelize-cli').Migration} */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Courses', {
      course_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      university_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Universities',
          key: 'university_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      course_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      course_main_entry_requirements: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      undergraduate_score_cgpa: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      undergraduate_score_percent: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      undergraduate_score: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      score_twelfth: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      fifteen_years_allowed: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      ielts: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      tofel: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      pte: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      duolingo: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      gmat_score: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      gre_score: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      course_degree: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      course_duration: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      total_tuition_fee: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      application_fee: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      course_intake: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      course_intake_status: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      course_notes: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      course_created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      course_updated_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      course_deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Courses');
  }
};

