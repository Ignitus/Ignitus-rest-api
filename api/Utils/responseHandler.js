// eslint-disable-next-line func-names
const responseHandler = {
  success(res, response) {
    res.json({
      statusCode: 200,
      success: true,
      message: 'Success',
      data: response
    });
  },
  error(res, message = 'Internal Server Error!', statusCode = 500) {
    res.json({ message, statusCode, success: false });
  }
};

export default responseHandler;
