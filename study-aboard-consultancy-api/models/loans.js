'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Loan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Loan.belongsTo(models.Student, {
        foreignKey: 'student_id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });
    }
  }
  Loan.init({
    loan_request_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    student_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    university_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    course_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    course_start_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    loan_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    loan_amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    notes: {
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
    loan_request_created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    loan_request_updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    loan_request_deleted_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'Loan',
    timestamps: false,
  });
  return Loan;
};
