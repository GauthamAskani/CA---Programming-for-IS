'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Broadcast extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here if needed
    }
  }
  Broadcast.init({
    broadcast_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    broadcast_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    broadcast_message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    broadcast_send_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    broadcast_expiry_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    broadcast_created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    broadcast_updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    broadcast_deleted_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'Broadcast',
    timestamps: false,
  });
  return Broadcast;
};
