/* eslint-disable max-len */
import professorProfile from '../Models/professorProfile.js';
import responseHandler from '../Utils/responseHandler.js';

export const viewProfile = (req, res) => {
  professorProfile
    .find({ email: req.userData.email })
    .exec()
    .then(result =>
      result.length > 0
        ? responseHandler.success(res, result)
        : responseHandler.success(res, {})
    )
    .catch(err => responseHandler.error(err, 'Profile not found', 404));
};
