import { Request, Response } from 'express';
import { Opportunity } from '../Models/opportunityModel';
import { InterfaceOpportunityModel } from 'api/Models/@modelTypes/interfaceOpportunityModel';
import { responseHandler } from '../Utils/responseHandler';
export const addOpportunity = (req: Request, res: Response) => {
  Opportunity.create(
    req.body,
    (err: Error, docs: InterfaceOpportunityModel) => {
      if (err) {
        responseHandler.error(res, err.message, 404);
      }
      return responseHandler.success(res, docs);
    },
  );
};

export const fetchAllOppurtunities = (req: Request, res: Response) => {
  Opportunity.find({}, (err: Error, docs: InterfaceOpportunityModel | null) => {
    if (err) {
      responseHandler.error(res, err.message, 400);
    }
    responseHandler.success(res, docs);
  });
};

export const fetchOpportunityByID = (req: Request, res: Response) => {
  Opportunity.findById(
    req.params.id,
    (err: Error, docs: InterfaceOpportunityModel | null) => {
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

export const updateOpportunity = (req: Request, res: Response) => {
  Opportunity.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err: Error, docs: InterfaceOpportunityModel | null) => {
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

export const deleteOpportunity = (req: Request, res: Response) => {
  Opportunity.findByIdAndRemove(
    req.params.id,
    (err: Error, docs: InterfaceOpportunityModel | null) => {
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
