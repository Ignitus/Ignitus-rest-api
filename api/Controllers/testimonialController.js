/* eslint-disable max-len */
import Testimonial from '../Models/testimonialModel.js';
import responseHandler from '../Utils/responseHandler.js';

export const addTestimonial = (req, res) => {
  Testimonial.create(req.body, err =>
    err ? responseHandler.error(res) : responseHandler.success(res)
  );
};
export const viewAllTestimonial = (req, res) => {
  Testimonial.find({}, (err, docs) =>
    err ? responseHandler.error(res) : responseHandler.success(res, docs)
  );
};
export const viewTestimonialByID = (req, res) => {
  Testimonial.findById(req.params.id, (err, docs) =>
    !err && docs
      ? responseHandler.success(res, docs)
      : responseHandler.error(res, 'Testimonial not found', 404)
  );
};
export const updateTestimonial = (req, res) => {
  Testimonial.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, docs) => {
      if (err || !docs) {
        return err
          ? responseHandler.error(res)
          : responseHandler.error(res, 'Testimonial not found', 404);
      }
      return responseHandler.success(res, docs);
    }
  );
};
export const deleteTestimonial = (req, res) => {
  Testimonial.findByIdAndRemove(req.params.id, (err, doc) => {
    if (err || !doc) {
      return err
        ? responseHandler.error(res)
        : responseHandler.error(res, 'Testimonial not found', 404);
    }
    // eslint-disable-next-line no-underscore-dangle
    return responseHandler.success(res, { _id: doc._id });
  });
};
