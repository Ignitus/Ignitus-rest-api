const mongoose = require("mongoose");

const teamMemberProfile = require("../models/team_member").teamMemberProfile;
const responseHandler = require("../helper/responseHandler");

// fetch all TeamMembers

exports.getAllTeamMembers = function(req, res) {
  teamMemberProfile
    .find()
    .exec()
    .then(teamMembers => {
      if (teamMembers.length > 0) {
        return responseHandler.success(res, result);
      }
    })
    .catch(err => responseHandler.error(res, "No TeamMembers", 404));
};

// create a Team Member

exports.createTeamMember = function(req, res) {
  teamMemberProfile
    .create(req.body)
    .then(teamMember => responseHandler.success(res, teamMember))
    .catch(err =>
      responseHandler.error(res, "Failed to create TeamMember", 404)
    );
};

// update/edit a TeamMember

exports.updateTeamMember = function(req, res) {
  teamMemberProfile.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, docs) => {
      if (err || !docs) {
        return err
          ? responseHandler.errpr(res)
          : responseHandler.error(res, "TeamMember not found", 404);
      }

      return responseHandler.success(res, docs);
    }
  );
};

// delete a TeamMember

exports.deleteTestimonial = function(req, res) {
  teamMemberProfile.findByIdAndRemove(req.params.id, (err, doc) => {
    if (err || !doc) {
      return err
        ? responseHandler.error(res)
        : responseHandler.error(
            res,
            "TeamMember not found, failed to delete",
            404
          );
    }

    return responseHandler.success(res, { _id: doc._id });
  });
};
