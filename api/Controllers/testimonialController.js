/* eslint-disable max-len */
import Testimonial from '../Models/testimonialModel.js';
import responseHandler from '../Utils/responseHandler.js';

export const addTestimonial = (req, res) => {
  Testimonial.create(req.body, err => {
    if (err) {
      throw new Error(err);
    }
    return responseHandler.success(res);
  });
};
export const fetchAllTestimonial = (req, res) => {
  Testimonial.find({}, (err, docs) => {
    if (err) {
      throw new Error(err);
    }
    responseHandler.success(res, docs);
  });
};
export const fetchTestimonialByID = (req, res) => {
  Testimonial.findById(req.params.id, (err, docs) => {
    if (err) {
      throw new Error(err);
    }
    if (!docs) {
      return responseHandler.error(res, 'Testimonial not found!', 404);
    }
    return responseHandler.success(res, docs);
  });
};
export const updateTestimonial = (req, res) => {
  Testimonial.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, docs) => {
      if (err) {
        throw new Error(err);
      }
      if (!docs) {
        return responseHandler.error(res, 'Testimonial not found!', 404);
      }
      return responseHandler.success(res, docs);
    }
  );
};
export const deleteTestimonial = (req, res) => {
  Testimonial.findByIdAndRemove(req.params.id, (err, doc) => {
    if (err) {
      throw new Error(err);
    }
    if (!docs) {
      return responseHandler.error(res, 'Testimonial not found!', 404);
    }
    // eslint-disable-next-line no-underscore-dangle
    return responseHandler.success(res, { _id: doc._id });
  });
};
