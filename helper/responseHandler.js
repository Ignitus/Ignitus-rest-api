(function () {
  const responseHandler = {
    success(res, response, information) {
      /*
                    A handler for success responses.

                    Arguments---------------
                    res - Response object
                    success - The data that needs to be returned to the client.
             */

      const statusCode = 200;
      const data = { statusCode: 200 };
      data.data = response;
      data.userInfo = information;
      data.message = 'Success';
      data.success = true;
      res.status(statusCode).json(data);
    },
    error(res, messages, statusCode) {
      /*
                    A handler for error responses.

                    Arguments---------------
                    res - Response object
                    message - The error message.
                    statusCode - The return status
             */

      const message = messages != undefined && messages.length > 0 ? messages : 'Something went wrong!';
      const data = { message };
      data.statusCode = statusCode == undefined ? 500 : statusCode;
      data.success = false;
      res.status(data.statusCode).json(data);
    },
  };

  module.exports = responseHandler;
}());
