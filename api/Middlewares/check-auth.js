const jwt = require('jsonwebtoken');
const responseHandler = require('../Utils/responseHandler');

// eslint-disable-next-line consistent-return
exports.checkStudentAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, 'secret');
    if (decoded.user_role === 'student') {
      req.userData = decoded;
      next();
    } else {
      return responseHandler.error(res, 'Unauthorized', 401);
    }
  } catch (error) {
    return responseHandler.error(res, 'Unauthorized', 401);
  }
};
exports.checkProfessorAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, 'secret');
    if (decoded.user_role === 'professor') {
      req.userData = decoded;
      next();
    } else {
      responseHandler.error(res, 'Unauthorized', 401);
    }
  } catch (error) {
    responseHandler.error(res, 'Unauthorized', 401);
  }
};
