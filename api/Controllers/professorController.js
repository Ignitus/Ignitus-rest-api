/* eslint-disable max-len */
import Professor from '../Models/professorModel.js';
import responseHandler from '../Utils/responseHandler.js';

export const viewProfessorProfile = (req, res) => {
  Professor
    .find({ email: req.userData.email })
    .exec()
    .then(result =>
      result.length > 0
        ? responseHandler.success(res, result)
        : responseHandler.success(res, {})
    )
    .catch(err => responseHandler.error(err, 'Profile not found', 404));
};
