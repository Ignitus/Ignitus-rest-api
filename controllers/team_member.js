const mongoose = require('mongoose'); // eslint-disable-line 

const { teamMemberProfile } = require('../models/team_member');
const responseHandler = require('../helper/responseHandler');

// fetch all TeamMembers

exports.getAllTeamMembers = (req, res) => {
  teamMemberProfile.find({}, (err, docs) => {
    if (err) {
      return responseHandler.error(res);
    }

    return responseHandler.success(res, docs);
  });
};

// fetch single TeamMember by Id

exports.getTeamMember = (req, res) => {
  teamMemberProfile.findById(req.params.id, (err, teamMember) => {
    if (err) {
      return responseHandler.error(res, 'TeamMember not found', 404);
    }

    return responseHandler.success(res, teamMember);
  });
};

// create a Team Member

exports.createTeamMember = (req, res) => {
  teamMemberProfile
    .create(req.body)
    .then(teamMember => responseHandler.success(res, teamMember))
    .catch(err => res.send(err));
};

// update/edit a TeamMember

exports.updateTeamMember = (req, res) => {
  teamMemberProfile
    .findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(updatedTeamMember => responseHandler.success(res, updatedTeamMember))
    .catch(() => responseHandler.error(res, 'Failed to update TeamMember', 404));
};

// delete a TeamMember

exports.deleteTeamMember = (req, res) => {
  teamMemberProfile.findByIdAndRemove(req.params.id)
    .then(responseFromDeleteQuery => responseHandler.success(res, responseFromDeleteQuery))
    .catch(() => responseHandler.error(res, 'Failed to delete TeamMember', 404));
};
