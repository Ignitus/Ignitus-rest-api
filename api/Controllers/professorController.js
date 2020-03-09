/* eslint-disable max-len */
import Professor from '../Models/professorModel.js';
import responseHandler from '../Utils/responseHandler.js';

export const studentProfile = (req, res) => {
  Professor.find({ email: req.userData.email }, (err, docs) => {
    if (err) {
      throw new Error(err);
    }
    if(!docs) {
      responseHandler.error(res, 'Profile not found', 404);
    }
    return responseHandler.success(res, docs);
  });
};