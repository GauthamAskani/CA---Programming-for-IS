'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Broadcasts', {
      broadcast_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      broadcast_title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      broadcast_message: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      broadcast_send_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      broadcast_expiry_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      broadcast_created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      broadcast_updated_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      broadcast_deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Broadcasts');
  }
};

