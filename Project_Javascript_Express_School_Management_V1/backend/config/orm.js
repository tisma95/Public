/**
 * @name orm.js
 * @author The World Wolf 95
 * @description
 *      This file contains the configuration od ORM sequelize
 */
const Sequelize  = require("sequelize");
const configuration = require("./config");

// Set the configuration type local or prod
const config = configuration.env == "local" ? configuration.local : configuration.production;

const sequelize = new Sequelize(config.database.name, config.database.username, config.database.password, {
      host: config.database.host,
      port: config.database.port,
      dialect: "mysql",
      freezeTableName: true,
      logging: false
});

module.exports = {
    sequelize
}