'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Universities', {
      university_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      university_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      university_shortname: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      university_description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      university_program_intake: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      university_program_intake_status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      university_created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      university_updated_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      university_deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Universities');
  }
};
