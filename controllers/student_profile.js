
// const mongoose = require('mongoose');

const { studentProfile } = require('../models/student_profile');
// const { professorProfile } = require('../models/professor_profile');
const responseHandler = require('../helper/responseHandler');

exports.viewProfile = (req, res) => {
  studentProfile.find({ email: req.userData.email })
    .exec()
    .then((result) => {
      if (result.length > 0) {
        return responseHandler.success(res, result);
      }
    })
    .catch = () => responseHandler.error(res, 'Profile not found', 404);
};
