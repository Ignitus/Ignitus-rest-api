
const mongoose = require('mongoose');

const Internships = require('../models/internship').Internships;
const responseHandler = require('../helper/responseHandler');

// adding a new intership
exports.addInternship = function (req, res) {
  Internships.create(req.body, err => (err ? responseHandler.error(res) : responseHandler.success(res)));
};

// displaying all internships
exports.viewAllInternships = function (req, res) {
  Internships.find({}, (err, docs) => (err ? responseHandler.error(res) : responseHandler.success(res, { internship: docs })));
};

// find internship by Id
exports.viewInternshipByID = function (req, res) {
  Internships.findById(req.params.id, (err, docs) => (!err && docs ? responseHandler.success(res, docs) : responseHandler.error(res, 'Internship not found', 404)));
};

// update an internship
exports.updateInternship = function (req, res) {
  Internships.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, docs) => {
    if (err || !docs) {
      return err ? responseHandler.error(res) : responseHandler.error(res, 'Internship not found', 404);
    }
    return responseHandler.success(res, docs);
  });
};

// delete an internship
exports.deleteInternship = function (req, res) {
  Internships.findByIdAndRemove(req.params.id, (err, doc) => {
    if (err || !doc) {
      return err ? responseHandler.error(res) : responseHandler.error(res, 'Internship not found', 404);
    }
    return responseHandler.success(res, { _id: doc._id });
  });
};
