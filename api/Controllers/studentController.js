import Student from '../Models/studentModel.js';
import responseHandler from '../Utils/responseHandler';

export const studentProfile = (req, res) => {
  Student.find({ email: req.userData.email }, (err, docs) => {
    if (err) {
      throw new Error(err);
    }
    if(!docs) {
      responseHandler.error(res, 'Profile not found', 404);
    }
    return responseHandler.success(res, docs);
  });
};