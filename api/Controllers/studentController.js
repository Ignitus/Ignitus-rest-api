import student from '../Models/studentModel.js';
import responseHandler from '../Utils/responseHandler.js';

export const viewStudentProfile = (req, res) => {
  student
    .find({ email: req.userData.email })
    .exec()
    .then(result => (result.length > 0
      ? responseHandler.success(res, result)
      : responseHandler.success(res, {})))
    .catch(err => responseHandler.error(err, 'Profile not found', 404));
};
