/**
 * @name Level.js
 * @author The World Wolf 95
 * @description
 *      It is the description of Level's model
 */

const { DataTypes, Sequelize } = require("sequelize");

module.exports = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4
  },
  name: {
    type: DataTypes.STRING,
    unique: true,
    require: true,
    allowNull: false
  }
};


