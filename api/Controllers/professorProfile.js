/* eslint-disable max-len */
const { professorProfile } = require('../Models/professor_profile');
const responseHandler = require('../Utils/responseHandler');

exports.viewProfile = (req, res) => {
  professorProfile
    .find({ email: req.userData.email })
    .exec()
    .then(result => (result.length > 0
      ? responseHandler.success(res, result)
      : responseHandler.success(res, {})))
    .catch(err => responseHandler.error(err, 'Profile not found', 404));
};
