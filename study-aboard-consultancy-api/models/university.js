'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class University extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here if needed
    }
  }
  University.init({
    university_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    university_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    university_shortname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    university_description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    university_program_intake: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    university_program_intake_status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    university_created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    university_updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    university_deleted_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'University',
    timestamps: false,
  });
  return University;
};
