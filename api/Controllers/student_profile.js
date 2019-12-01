
const mongoose = require('mongoose');

const studentProfile = require('../Models/student_profile').studentProfile;
const professorProfile = require('../Models/professor_profile').professorProfile;
const responseHandler = require('../Utils/responseHandler');

exports.viewProfile = function (req, res) {
  studentProfile.find({ email: req.userData.email })
    .exec()
    .then((result) => {
      if (result.length > 0) {
        return responseHandler.success(res, result);
      }
    })
    .catch(err => responseHandler.error(res, 'Profile not found', 404));
};
