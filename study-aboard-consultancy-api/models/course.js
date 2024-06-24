'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Course.belongsTo(models.University, {
        foreignKey: 'university_id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });
    }
  }
  Course.init({
    course_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    university_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    course_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    course_main_entry_requirements: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    undergraduate_score_cgpa: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    undergraduate_score_percent: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    undergraduate_score: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    score_twelfth: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fifteen_years_allowed: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ielts: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tofel: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pte: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    duolingo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    gmat_score: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    gre_score: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    course_degree: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    course_duration: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    total_tuition_fee: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    application_fee: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    course_intake: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    course_intake_status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    course_notes: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    course_created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    course_updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    course_deleted_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'Course',
    timestamps: false,
  });
  return Course;
};
