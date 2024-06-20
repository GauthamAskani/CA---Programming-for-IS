'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MedicalInsurance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MedicalInsurance.belongsTo(models.Student, {
        foreignKey: 'student_id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });
    }
  }
  MedicalInsurance.init({
    medical_insurance_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    student_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cover_start_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    cover_end_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    destination_country: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    university_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    course_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    course_cost: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    course_start_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    course_end_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    student_notes: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    admin_remarks: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    medical_insurance_created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    medical_insurance_updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    medical_insurance_deleted_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'MedicalInsurance',
    timestamps: false,
  });
  return MedicalInsurance;
};
