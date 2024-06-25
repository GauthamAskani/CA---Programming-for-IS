'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Application extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Application.belongsTo(models.Student, {
        foreignKey: 'student_id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });
      Application.belongsTo(models.University, {
        foreignKey: 'university_id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });
      Application.belongsTo(models.Course, {
        foreignKey: 'course_id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });
    }
  }
  Application.init({
    application_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    student_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    university_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    course_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    student_notes: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    application_status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    admin_remarks: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    application_created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    application_updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    application_deleted_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'Application',
    timestamps: false,
  });
  return Application;
};
