/**
 * @name config_example.js
 * @author The World Wolf 95
 * @description
 *    This file contains the value example of application configuration 
 */
module.exports = {
    /**
     * DEFINITION OF ENVIRONMENT PRODUCTION OR LOCAL
     */
    env: "local", // Put here "production" if it is production mode 

    /**
     * DEFINTION OF LOCAL'S CONFIGURATION
     */
    local: {
      // Local's database configuration 
      database: {
        host: "localhost",
        port: 3306,
        username: "root",
        password: "",
        name: "school_manager_v1"
      },
      // Local application configuration
      host: "http://localhost:3000",
      port: 3000,
      frontend: "http://127.0.0.1:5500/frontend/index.html"
    },
    /**
     * DEFINTION OF PRODUCTION'S CONFIGURATION
     */
    // Put here the configuration of production environment, the same parameters that the local configuration
    production: {
      // Production's database configuration 
      database: {
        host: "",
        port: "",
        username: "",
        password: "",
        name: "",
      },
      // Production application configuration
      host: "",
      port: 80,
      frontend: ""
    }
  };
  