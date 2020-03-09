import TeamMember from '../Models/teamMembersModel.js';
import responseHandler from '../Utils/responseHandler.js';

export const fetchAllTeamMembers = (req, res) => {
  TeamMember.find({}, (err, docs) => {
    if (err) {
      throw new Error(err);
    }
    return responseHandler.success(res, docs);
  });
};

export const fetchTeamMemberByID = (req, res) => {
  TeamMember.findById(req.params.id, (err, docs) => {
    if (err) {
      throw new Error(err);
    }
    if (!docs) {
      return responseHandler.error(res, 'TeamMember not found!', 404);
    }
    return responseHandler.success(res, docs);
  });
};

export const addTeamMember = (req, res) => {
  TeamMember.create(req.body, err => {
    if (err) {
      throw new Error(err);
    }
    return responseHandler.success(res, docs);
  });
};

export const updateTestimonial = (req, res) => {
  TeamMember.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, docs) => {
      if (err) {
        throw new Error(err);
      }
      if (!docs) {
        return responseHandler.error(res, 'TeamMember not found!', 404);
      }
      return responseHandler.success(res, docs);
    }
  );
};

export const deleteTeamMember = (req, res) => {
  TeamMember.findByIdAndRemove(req.params.id, (err, docs) => {
    if (err) {
      throw new Error(err);
    }
    if (!docs) {
      return responseHandler.error(res, 'TeamMember not found!', 404);
    }
    // eslint-disable-next-line no-underscore-dangle
    return responseHandler.success(res, { _id: docs._id });
  });
};