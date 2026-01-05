/**
 * @name Student.js
 * @author The World Wolf 95
 * @description
 *      It is the description of Student's model
 */

const { DataTypes, Sequelize } = require("sequelize");

module.exports = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4
  },

  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true
  },

  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true
  },

  birthday: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    require: true
  },

  level: {
    type: DataTypes.UUID,
    allowNull: false,
    require: true
  }
};
