const express = require("express");
const app = express();
const configuration = require("./config/config");
const ormManager = require("./config/orm");
const routes = require("./config/routes");

// Define using json data
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({
  extended: true
})); // for parsing application/x-www-form-urlencoded

// Configuration of cors
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Set the config type
const config = configuration.env == "local" ? configuration.local : configuration.production;

// Connect on database
const orm = ormManager.sequelize;
orm
  .authenticate()
  .then(async () => {
    console.log("Server::database has been loaded successfully");
    // Create the default level
    const LevelServices = require("./services/LevelServices");
    await LevelServices.createDefaultLevels();
  })
  .catch(err => {
    console.error("Server::database met error: " + err);
  });

// Running the server listening
try {
  app.use(routes);
  // Define static folder
  app.use(express.static("assets"));
  app.listen(config.port, () => console.log(`Server::running successfully on port ${config.port}`));
} catch (err) {
  console.error("Server::starting has met error: " + err);
}

// We export app for using it in test cases : https://medium.com/@ehtemam/writing-test-with-supertest-and-mocha-for-expressjs-routes-555d2910d2c2
module.exports = app;