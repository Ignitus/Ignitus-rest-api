(function(){

    'use strict';

    var responseHandler = {
        success : function(res, response){

            /*
                    A handler for success responses.

                    Arguments---------------
                    res - Response object
                    success - The data that needs to be returned to the client.
             */


            var statusCode = 200;
            var data = {statusCode : 200};
            data.data = response;
            data.message="Success";
            data.success = true;
            res.status(statusCode).json(data);
        },
        error : function(res, message, statusCode){
            /*
                    A handler for error responses.

                    Arguments---------------
                    res - Response object
                    message - The error message.
                    statusCode - The return status
             */

            var message = message != undefined && message.length > 0 ? message : "Something went wrong!";
            var data = { "message" : message };
            data.statusCode = statusCode == undefined ? 500 : statusCode;
            data.success = false;
            res.status(data.statusCode).json(data);
        }
    };

    module.exports = responseHandler;



})();