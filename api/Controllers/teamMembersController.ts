import { Request, Response } from 'express';
import TeamMember from '../Models/teamMembersModel.js';
import responseHandler from '../Utils/responseHandler';

export const fetchAllTeamMembers = (req: Request, res: Response) => {
  TeamMember.find({}, (err: Error, docs) => {
    if (err) {
      return responseHandler.error(res, err.message, 400);
    }
    return responseHandler.success(res, docs);
  });
};

export const fetchTeamMemberByID = (req: Request, res: Response) => {
  TeamMember.findById(req.params.id, (err, docs) => {
    if (err) {
      return responseHandler.error(res, err.message, 400);
    }
    if (!docs) {
      return responseHandler.error(res, 'TeamMember not found!', 404);
    }
    return responseHandler.success(res, docs);
  });
};

export const createTeamMember = (req: Request, res: Response) => {
  TeamMember.create(req.body, (err: any, docs: any) => {
    if (err) {
      return responseHandler.error(res, err.message, 400);
    }
    return responseHandler.success(res, docs);
  });
};

export const updateTeamMember = (req: Request, res: Response) => {
  TeamMember.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, docs) => {
      if (err) {
        return responseHandler.error(res, err.message, 400);
      }
      if (!docs) {
        return responseHandler.error(res, 'TeamMember not found!', 404);
      }
      return responseHandler.success(res, docs);
    },
  );
};

export const deleteTeamMember = (req: Request, res: Response) => {
  TeamMember.findByIdAndRemove(req.params.id, (err, docs) => {
    if (err) {
      return responseHandler.error(res, err.message, 400);
    }
    if (!docs) {
      return responseHandler.error(res, 'TeamMember not found!', 404);
    }
    // eslint-disable-next-line no-underscore-dangle
    return responseHandler.success(res, { _id: docs._id });
  });
};
