
require('mongoose');

const { Internships } = require('../models/internship');
const responseHandler = require('../helper/responseHandler');

// adding a new intership
exports.addInternship = (req, res) => {
  Internships.create(req.body, err => (
    err ? responseHandler.error(res) : responseHandler.success(res)
  ));
};

// displaying all internships
exports.viewAllInternships = (req, res) => {
  Internships.find({}, (err, docs) => (
    err ? responseHandler.error(res) : responseHandler.success(res, { internship: docs })
  ));
};

// find internship by Id
exports.viewInternshipByID = (req, res) => {
  Internships.findById(req.params.id, (err, docs) => (
    !err && docs ? responseHandler.success(res, docs) : responseHandler.error(res, 'Internship not found', 404)
  ));
};

// update an internship
exports.updateInternship = (req, res) => {
  Internships.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, docs) => {
    if (err || !docs) {
      return err ? responseHandler.error(res) : responseHandler.error(res, 'Internship not found', 404);
    }
    return responseHandler.success(res, docs);
  });
};

// delete an internship
exports.deleteInternship = (req, res) => {
  Internships.findByIdAndRemove(req.params.id, (err, doc) => {
    if (err || !doc) {
      return err ? responseHandler.error(res) : responseHandler.error(res, 'Internship not found', 404);
    }
    /* eslint-disable no-underscore-dangle */
    return responseHandler.success(res, { _id: doc._id });
  });
};
