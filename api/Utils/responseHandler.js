// eslint-disable-next-line func-names
(function () {
  const responseHandler = {
    success(res, response) {
      res.json({
        statusCode: 200, success: true, message: 'Success', data: response,
      });
    },
    error(res, message, statusCode) {
      const msg = message !== undefined && message.length > 0
        ? message
        : 'Something went wrong!';
      const data = { msg };
      data.statusCode = statusCode === undefined ? 500 : statusCode;
      data.success = false;
      res.status(data.statusCode).json(data);
    },
  };

  module.exports = responseHandler;
}());
