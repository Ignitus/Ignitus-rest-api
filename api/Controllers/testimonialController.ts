import { Request, Response } from 'express';
import { InterfaceTestimonialModel } from 'api/Models/@modelTypes/interfaceTestimonialModel';
import { Testimonial } from '../Models/testimonialModel';
import { responseHandler } from '../Utils/responseHandler';
import { CallbackError } from 'mongoose';

export const addTestimonial = (req: Request, res: Response): void => {
  Testimonial.create(
    req.body,
    (err: CallbackError, docs: InterfaceTestimonialModel) => {
      if (err) {
        return responseHandler.error(res, err.message, 400);
      }
      return responseHandler.success(res, docs);
    },
  );
};

export const fetchAllTestimonial = (req: Request, res: Response): void => {
  Testimonial.find(
    {},
    (err: CallbackError, docs: InterfaceTestimonialModel[]) => {
      if (err) {
        return responseHandler.error(res, err.message, 400);
      }
      responseHandler.success(res, docs);
    },
  );
};

export const fetchTestimonialByID = (req: Request, res: Response): void => {
  Testimonial.findById(
    req.params.id,
    (err: CallbackError, docs: InterfaceTestimonialModel | null) => {
      if (err) {
        return responseHandler.error(res, err.message, 400);
      }
      if (!docs) {
        return responseHandler.error(res, 'Testimonial not found!', 404);
      }
      return responseHandler.success(res, docs);
    },
  );
};

export const updateTestimonial = (req: Request, res: Response): void => {
  Testimonial.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err: CallbackError, docs: InterfaceTestimonialModel | null) => {
      if (err) {
        return responseHandler.error(res, err.message, 400);
      }
      if (!docs) {
        return responseHandler.error(res, 'Testimonial not found!', 404);
      }
      return responseHandler.success(res, docs);
    },
  );
};

export const deleteTestimonial = (req: Request, res: Response): void => {
  Testimonial.findOneAndRemove(
    { _id: req.params.id },
    req.body,
    (err: CallbackError, docs: InterfaceTestimonialModel | null) => {
      if (err) {
        return responseHandler.error(res, err.message, 400);
      }
      if (!docs) {
        return responseHandler.error(res, 'Testimonial not found!', 404);
      }
      // eslint-disable-next-line no-underscore-dangle
      return responseHandler.success(res, { _id: docs._id });
    },
  );
};
