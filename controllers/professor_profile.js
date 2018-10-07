
require('mongoose');

const { professorProfile } = require('../models/professor_profile');
const responseHandler = require('../helper/responseHandler');


exports.viewProfile = (req, res) => {
  professorProfile.find({ email: req.userData.email })
    .exec()
    .then((result) => {
      if (result.length > 0) {
        return responseHandler.success(res, result);
      }
      return null;
    })
    .catch(() => responseHandler.error(res, 'Profile not found', 404));
};
