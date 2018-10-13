const mongoose = require('mongoose');

const teamMemberProfile = require('../models/team_member').teamMemberProfile;
const responseHandler = require('../helper/responseHandler');

// fetch all TeamMembers

exports.getAllTeamMembers = function (req, res) {
  teamMemberProfile
    .find({}, (err, docs) => {
      if (err) {
        return responseHandler.error(res);
      }

      return responseHandler.success(res, docs)
    })
};

// fetch single TeamMember by Id

exports.getTeamMember = function (req, res) {
  teamMemberProfile.findById(req.params.id, (err, teamMember) => {
    if (err) {
      return responseHandler.error(res, 'TeamMember not found', 404)
    }

    return responseHandler.success(res, teamMember)
  })

};

// create a Team Member

exports.createTeamMember = function (req, res) {
  teamMemberProfile
    .create(req.body)
    .then(teamMember => responseHandler.success(res, teamMember))
    .catch(err => res.send(err));
};

// update/edit a TeamMember

exports.updateTeamMember = function (req, res) {
  teamMemberProfile.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, docs) => {
      if (err || !docs) {
        return err
          ? responseHandler.errpr(res)
          : responseHandler.error(res, 'TeamMember not found', 404);
      }

      return responseHandler.success(res, docs);
    }
  );
};

// delete a TeamMember

exports.deleteTeamMember = function (req, res) {
  teamMemberProfile.findByIdAndRemove(req.params.id, (err, doc) => {
    if (err || !doc) {
      return err
        ? responseHandler.error(res)
        : responseHandler.error(
          res,
          'TeamMember not found, failed to delete',
          404
        );
    }

    return responseHandler.success(res, { _id: doc._id });
  });
};
