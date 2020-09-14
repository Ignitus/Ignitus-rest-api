import { Request, Response } from 'express';
import { InterfaceTestimonialModel } from 'api/Models/@modelTypes/interfaceTestimonialModel';
import { Testimonial } from '../Models/testimonialModel';
import { responseHandler } from '../Utils/responseHandler';

export const addTestimonial = (req: Request, res: Response) => {
  Testimonial.create(req.body, (err: Error, docs: any) => {
    if (err) {
      return responseHandler.error(res, err.message, 400);
    }
    return responseHandler.success(res, docs);
  });
};

export const fetchAllTestimonial = (req: Request, res: Response) => {
  Testimonial.find({}, (err: Error, docs: InterfaceTestimonialModel[]) => {
    if (err) {
      return responseHandler.error(res, err.message, 400);
    }
    responseHandler.success(res, docs);
  });
};

export const fetchTestimonialByID = (req: Request, res: Response) => {
  Testimonial.findById(
    req.params.id,
    (err: Error, docs: InterfaceTestimonialModel | null) => {
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

export const updateTestimonial = (req: Request, res: Response) => {
  Testimonial.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err: Error, docs: InterfaceTestimonialModel | null) => {
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

export const deleteTestimonial = (req: Request, res: Response) => {
  Testimonial.findByIdAndRemove(
    req.params.id,
    (err: Error, docs: InterfaceTestimonialModel | null) => {
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
