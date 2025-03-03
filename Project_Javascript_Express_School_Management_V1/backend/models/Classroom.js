/**
 * @name Classroom.js
 * @author The World Wolf 95
 * @description
 *      It is the description of Classroom's model
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
        allowNull: false,
        require: true
    },

    capacity: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true
    },

    level: {
        type: DataTypes.UUID,
        allowNull: false,
        require: true
    }
};
