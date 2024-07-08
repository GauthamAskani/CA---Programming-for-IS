'use strict';

/** @type {import('sequelize-cli').Migration} */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Applications', {
      application_id: {
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
      course_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Courses',
          key: 'course_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      student_notes: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      application_status: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      admin_remarks: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      application_created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      application_updated_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      application_deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Applications');
  }
};

