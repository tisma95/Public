/**
 * @name HttpServices.js
 * @author The World Wolf 95
 * @description
 *    This file contains the services of HTTP response
 * 
 * Code 200: Request has been successfully
 * Code 201: Ressource has been created
 * Code 401: Unauthorized
 * Code 404: Not Found
 * Code 409: Conflict
 * Code 500: Internal Server Error
 */
 
module.exports = {
    /**
     * @name created
     * @param {Object} res 
     * @param {Object} data 
     * @description 
     *      This function is called when new ressource is created
     */
    created: function (res, data) {
        res.status(201);
        res.send(data);
    },

    /**
     * @name fetched
     * @param {Object} res 
     * @param {Object} data 
     * @description 
     *      This function is called when the request has been executed successfully
     */
    fetched: function(res, data) {
        res.status(200);
        res.send(data);
    },

    /**
     * @name unauthorized
     * @param {Object} res 
     * @param {Object} data 
     * @description
     *      This function is called when unauthorized's request has executed 
     */
    unauthorized: function(res, data) {
        res.status(401);
        res.send(data);
    },
    
    /**
     * @name notFound
     * @param {Object} res 
     * @param {Object} data
     * @description 
     *      This function is called when the ressources has not found 
     */
    notFound: function(res, data) {
        res.status(404);
        res.send(data);
    },

    /**
     * @name conflict
     * @param {*} res 
     * @param {*} data 
     * @description
     *      This function is called when the conflict type is met.
     */
    conflict: function(res, data) {
        res.status(409);
        res.send(data);
    },

    /**
     * @name internalServerError
     * @param {Object} res 
     * @param {Object} data 
     * @description
     *      This function is called when the server encountered the error.
     */
    internalServerError: function(res, data) {
        res.status(500);
        res.send(data);
    }
};