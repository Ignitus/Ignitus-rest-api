/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
import { Request, Response } from 'express';
import Oppurtunity from '../Models/opportunityModel.js';
import responseHandler from '../Utils/responseHandler';

export const addOppurtunity = (req: Request, res: Response) => {
  Oppurtunity.create(req.body, (err: any, docs: any) => {
    if (err) {
      throw new Error(err);
    }
    return responseHandler.success(res, docs);
  });
};

export const fetchAllOppurtunities = (req: Request, res: Response) => {
  Oppurtunity.find({}, (err, docs) => {
    if (err) {
      throw new Error(err);
    }
    responseHandler.success(res, docs);
  });
};

export const fetchOppurtunityByID = (req: Request, res: Response) => {
  Oppurtunity.findById(req.params.id, (err, docs) => {
    if (err) {
      throw new Error(err);
    }
    if (!docs) {
      return responseHandler.error(res, 'Oppurtunity not found!', 404);
    }
    return responseHandler.success(res, docs);
  });
};

export const updateOppurtunity = (req: Request, res: Response) => {
  Oppurtunity.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, docs) => {
      if (err) {
        throw new Error(err);
      }
      if (!docs) {
        return responseHandler.error(res, 'Oppurtunity not found!', 404);
      }
      return responseHandler.success(res, docs);
    },
  );
};

export const deleteOppurtunity = (req: Request, res: Response) => {
  Oppurtunity.findByIdAndRemove(req.params.id, (err, docs) => {
    if (err) {
      throw new Error(err);
    }
    if (!docs) {
      return responseHandler.error(res, 'Oppurtunity not found!', 404);
    }
    // eslint-disable-next-line no-underscore-dangle
    return responseHandler.success(res, { _id: docs._id });
  });
};
