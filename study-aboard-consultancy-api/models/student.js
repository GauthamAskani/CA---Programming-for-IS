'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Student.hasMany(models.MedicalInsurance, {
        foreignKey: 'student_id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });
      Student.hasMany(models.Loan, {
        foreignKey: 'student_id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });
      Student.hasMany(models.Document, {
        foreignKey: 'student_id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });
    }
  }
  Student.init({
    student_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    student_first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    student_family_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    student_dob: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    student_gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    student_country_origin: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    student_phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    student_email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    student_password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    student_status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    student_document_status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    passcode: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    student_created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    student_updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    student_deleted_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'Student',
    timestamps: false,
  });
  return Student;
};

