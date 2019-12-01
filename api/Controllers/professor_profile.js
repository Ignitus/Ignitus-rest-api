
const mongoose = require('mongoose');

const { studentProfile } = require('../Models/student_profile');
const { professorProfile } = require('../Models/professor_profile');
const responseHandler = require('../Utils/responseHandler');


exports.viewProfile = function (req, res) {
  professorProfile.find({ email: req.userData.email })
    .exec()
    .then((result) => {
      if (result.length > 0) {
        return responseHandler.success(res, result);
      }
    })
    .catch(err => responseHandler.error(res, 'Profile not found', 404));
};
