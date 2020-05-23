import { Request, Response } from 'express';
import Student from '../Models/studentModel.js';
import responseHandler from '../Utils/responseHandler';

export const studentProfile = (req: Request, res: Response) => {
  Student.find({ email: req.decoded.email }, (err, docs) => {
    if (err) {
      throw new Error(err);
    }
    if (!docs) {
      responseHandler.error(res, 'Profile not found', 404);
    }
    return responseHandler.success(res, docs);
  });
};
