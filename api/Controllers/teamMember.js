const { teamMemberProfile } = require('../Models/team_member');
const responseHandler = require('../Utils/responseHandler');

exports.getAllTeamMembers = (req, res) => {
  teamMemberProfile
    .find({})
    .then(teamMembers => responseHandler.success(res, teamMembers))
    .catch(() => responseHandler.error(res, 'Failed to fetch all TeamMembers', 404));
};

exports.getTeamMember = (req, res) => {
  teamMemberProfile
    .findById(req.params.id)
    .then(teamMember => responseHandler.success(res, teamMember))
    .catch(() => responseHandler.error(res, 'Failed to fetch TeamMember', 404));
};

exports.createTeamMember = (req, res) => {
  teamMemberProfile
    .create(req.body)
    .then(teamMember => responseHandler.success(res, teamMember))
    .catch(() => responseHandler.error(res, 'Failed to create TeamMember', 400));
};

exports.updateTeamMember = (req, res) => {
  teamMemberProfile
    .findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(updatedTeamMember => responseHandler.success(res, updatedTeamMember))
    .catch(() => responseHandler.error(res, 'Failed to update TeamMember', 404));
};

exports.deleteTeamMember = (req, res) => {
  teamMemberProfile
    .findByIdAndRemove(req.params.id)
    .then(responseFromDeleteQuery => responseHandler.success(res, responseFromDeleteQuery))
    .catch(() => responseHandler.error(res, 'Failed to delete TeamMember', 404));
};
