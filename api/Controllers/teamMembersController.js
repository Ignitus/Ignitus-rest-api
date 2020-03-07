const { teamMembers } = require('../Models/teamMembersModel');
const responseHandler = require('../Utils/responseHandler');

exports.getAllTeamMembers = (req, res) => {
  teamMembers
    .find({})
    .then(teamMember => responseHandler.success(res, teamMember))
    .catch(() => responseHandler.error(res, 'Failed to fetch all TeamMembers', 404));
};

exports.getTeamMember = (req, res) => {
  teamMembers
    .findById(req.params.id)
    .then(teamMember => responseHandler.success(res, teamMember))
    .catch(() => responseHandler.error(res, 'Failed to fetch TeamMember', 404));
};

exports.createTeamMember = (req, res) => {
  teamMembers
    .create(req.body)
    .then(teamMember => responseHandler.success(res, teamMember))
    .catch(() => responseHandler.error(res, 'Failed to create TeamMember', 400));
};

exports.updateTeamMember = (req, res) => {
  teamMembers
    .findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(updatedTeamMember => responseHandler.success(res, updatedTeamMember))
    .catch(() => responseHandler.error(res, 'Failed to update TeamMember', 404));
};

exports.deleteTeamMember = (req, res) => {
  teamMembers
    .findByIdAndRemove(req.params.id)
    .then(responseFromDeleteQuery => responseHandler.success(res, responseFromDeleteQuery))
    .catch(() => responseHandler.error(res, 'Failed to delete TeamMember', 404));
};
