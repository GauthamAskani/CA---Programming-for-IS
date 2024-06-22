'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Document extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Document.belongsTo(models.Student, {
        foreignKey: 'student_id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });
    }
  }
  Document.init({
    document_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    student_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    document_category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    document_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    document_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    document_url: {
      type: DataTypes.STRING,
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
    document_created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    document_updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    document_deleted_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'Document',
    timestamps: false,
  });
  return Document;
};
