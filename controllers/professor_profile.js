
const mongoose = require('mongoose');

const studentProfile = require('../models/student_profile').studentProfile;
const professorProfile = require('../models/professor_profile').professorProfile;
const responseHandler = require('../helper/responseHandler');


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
