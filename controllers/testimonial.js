
const mongoose = require('mongoose');

const Testimonial = require('../models/testimonial').Testimonial;
const responseHandler = require('../helper/responseHandler');

// adding a new testimonial
exports.addTestimonial = function (req, res) {
  Testimonial.create(req.body, err => (err ? responseHandler.error(res) : responseHandler.success(res)));
};

// displaying all testimonials
exports.viewAllTestimonial = function (req, res) {
  Testimonial.find({}, (err, docs) => (err ? responseHandler.error(res) : responseHandler.success(res, docs)));
};

// find testimonial by Id
exports.viewTestimonialByID = function (req, res) {
  Testimonial.findById(req.params.id, (err, docs) => (!err && docs ? responseHandler.success(res, docs) : responseHandler.error(res, 'Testimonial not found', 404)));
};

// update an testimonial
exports.updateTestimonial = function (req, res) {
  Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, docs) => {
    if (err || !docs) {
      return err ? responseHandler.error(res) : responseHandler.error(res, 'Testimonial not found', 404);
    }
    return responseHandler.success(res, docs);
  });
};

// delete an testimonial
exports.deleteTestimonial = function (req, res) {
  Testimonial.findByIdAndRemove(req.params.id, (err, doc) => {
    if (err || !doc) {
      return err ? responseHandler.error(res) : responseHandler.error(res, 'Testimonial not found', 404);
    }
    return responseHandler.success(res, { _id: doc._id });
  });
};
