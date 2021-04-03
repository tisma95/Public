/**
 * @name LevelServices.js
 * @author The World Wolf 95
 * @description
 *    This file contains the services of Level's model
 */

// Reference of constants
const constants = require("../constants/constants");

// Define ORM
const orm = require("../config/orm");
const sequelize = orm.sequelize;

// Define default levels keys
const defaultLevels = ["PRIMARY", "COLLEGE", "HIGH_SCHOOL", "UNIVERSITY"];

// Define the Level model
const level = require("../models/Level");
const Level = sequelize.define("Level", level, { freezeTableName: true });

module.exports = {
  /**
   * @name createDefaultLevels
   * @description
   *      This function creates in database the default levels if doesn't exist.
   */
  async createDefaultLevels() {
    try {
      for (var item of defaultLevels) {
        const isLevelExist = await Level.findOne({
          where: {
            name: item
          }
        });
        if (!isLevelExist) {
          // Level doesn't exist
          await Level.create({
            name: item
          });
        }
      }
      const allLevels = await Level.findAll();
      return {
        status: constants.DEFAULT_LEVELS_CREATED_SUCCESSFULLY,
        data: allLevels
      };
    } catch (err) {
      return {
        status: constants.DATABASE_ERROR,
        error: err
      };
    }
  },

  /**
   * @name getLevelByName
   * @param {String} levelName
   * @description
   *      This function permits to find the level in database identified by its key's name.
   */
  async getLevelByName(levelName) {
    try {
      const level = await Level.findOne({ where: { name: levelName } });
      if (level) {
        return {
          status: constants.LEVEL_FOUND_SUCCESSFULLY,
          data: level
        };
      } else {
        return {
          status: constants.LEVEL_NOT_FOUND,
          data: null
        };
      }
    } catch (err) {
      return {
        status: constants.DATABASE_ERROR,
        error: err
      };
    }
  },

  /**
   * @name getLevelById
   * @param {String} levelId
   * @description
   *      This function permits to find the level in database identified by its id.
   */
  async getLevelById(levelId) {
    try {
      const level = await Level.findOne({ where: { id: levelId } });
      if (level) {
        return {
          status: constants.LEVEL_FOUND_SUCCESSFULLY,
          data: level
        };
      } else {
        return {
          status: constants.LEVEL_NOT_FOUND,
          data: null
        };
      }
    } catch (err) {
      return {
        status: constants.DATABASE_ERROR,
        error: err
      };
    }
  },

  /**
   * @name getAllLevels
   * @description
   *    This function permits to fetch all levels in database
   */
  async getAllLevels() {
    try {
      const levels = await Level.findAll();
      if (levels.length > 0) {
        return {
          status: constants.LEVELS_FOUND_SUCCESSFULLY,
          data: levels
        };
      } else {
        return {
          status: constants.LEVELS_NOT_FOUND,
          data: null
        };
      }
    } catch (err) {
      return {
        status: constants.DATABASE_ERROR,
        error: err
      };
    }
  }
};
