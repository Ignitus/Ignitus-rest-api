import { Request, Response } from 'express';
import Professor from '../Models/professorModel.js';
import responseHandler from '../Utils/responseHandler';

export const professorProfile = (req: Request, res: Response) => {
  Professor.find({ email: req.decoded.email }, (err, docs) => {
    if (err) {
      throw new Error(err);
    }
    if (!docs) {
      responseHandler.error(res, 'Profile not found', 404);
    }
    return responseHandler.success(res, docs);
  });
};
