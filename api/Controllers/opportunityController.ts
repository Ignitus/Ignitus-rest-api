import { Request, Response } from 'express';
import { Opportunity } from '../Models/opportunityModel';
import { InterfaceOpportunityModel } from 'api/Models/@modelTypes/interfaceOpportunityModel';
import { responseHandler } from '../Utils/responseHandler';
import { CallbackError } from 'mongoose';

export const addOpportunity = (req: Request, res: Response): void => {
  Opportunity.create(
    req.body,
    (err: CallbackError, docs: InterfaceOpportunityModel[]) => {
      if (err) {
        responseHandler.error(res, err.message, 404);
      }
      return responseHandler.success(res, docs);
    },
  );
};

export const fetchAllOppurtunities = (req: Request, res: Response): void => {
  Opportunity.find(
    {},
    (err: CallbackError, docs: InterfaceOpportunityModel[] | null) => {
      if (err) {
        responseHandler.error(res, err.message, 400);
      }
      responseHandler.success(res, docs);
    },
  );
};

export const fetchOpportunityByID = (req: Request, res: Response): void => {
  Opportunity.findById(
    req.params.id,
    (err: CallbackError, docs: InterfaceOpportunityModel | null) => {
      if (err) {
        responseHandler.error(res, err.message, 400);
      }
      if (!docs) {
        return responseHandler.error(res, 'Opportunity not found!', 404);
      }
      return responseHandler.success(res, docs);
    },
  );
};

export const updateOpportunity = (req: Request, res: Response): void => {
  Opportunity.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err: CallbackError, docs: InterfaceOpportunityModel | null) => {
      if (err) {
        responseHandler.error(res, err.message, 400);
      }
      if (!docs) {
        return responseHandler.error(res, 'Opportunity not found!', 404);
      }
      return responseHandler.success(res, docs);
    },
  );
};

export const deleteOpportunity = (req: Request, res: Response): void => {
  Opportunity.findOneAndRemove(
    { _id: req.params.id },
    req.body,
    (err: CallbackError, docs: InterfaceOpportunityModel | null) => {
      if (err) {
        responseHandler.error(res, err.message, 400);
      }
      if (!docs) {
        return responseHandler.error(res, 'Opportunity not found!', 404);
      }
      // eslint-disable-next-line no-underscore-dangle
      return responseHandler.success(res, { _id: docs._id });
    },
  );
};
