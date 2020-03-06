import studentProfile from '../Models/studentProfile.js';
import responseHandler from '../Utils/responseHandler.js';

export const viewStudentProfile = (req, res) => {
  studentProfile
    .find({ email: req.userData.email })
    .exec()
    .then(result => (result.length > 0
      ? responseHandler.success(res, result)
      : responseHandler.success(res, {})))
    .catch(err => responseHandler.error(err, 'Profile not found', 404));
};
