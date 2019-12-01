/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */

const { Internships } = require('../Models/internship');
const responseHandler = require('../Utils/responseHandler');

exports.addInternship = (req, res) => {
  Internships.create(req.body, err => (err ? responseHandler.error(res) : responseHandler.success(res)));
};

exports.viewAllInternships = (req, res) => {
  Internships.find({}, (err, docs) => (err
    ? responseHandler.error(res)
    : responseHandler.success(res, { internship: docs })));
};

exports.viewInternshipByID = (req, res) => {
  Internships.findById(req.params.id, (err, docs) => (!err && docs
    ? responseHandler.success(res, docs)
    : responseHandler.error(res, 'Internship not found', 404)));
};

exports.updateInternship = (req, res) => {
  Internships.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, docs) => {
      if (err || !docs) {
        return err
          ? responseHandler.error(res)
          : responseHandler.error(res, 'Internship not found', 404);
      }
      return responseHandler.success(res, docs);
    },
  );
};

exports.deleteInternship = (req, res) => {
  Internships.findByIdAndRemove(req.params.id, (err, doc) => {
    if (err || !doc) {
      return err
        ? responseHandler.error(res)
        : responseHandler.error(res, 'Internship not found', 404);
    }
    return responseHandler.success(res, { _id: doc._id });
  });
};
