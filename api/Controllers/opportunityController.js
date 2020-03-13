/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */

import Oppurtunity from '../Models/opportunityModel.js';
import responseHandler from '../Utils/responseHandler.js';

export const addOppurtunity = (req, res) => {
  Oppurtunity.create(req.body, (err, docs) => {
    if (err) {
      throw new Error(err);
    }
    return responseHandler.success(res, docs);
  });
};

export const fetchAllOppurtunities = (req, res) => {
  Oppurtunity.find({}, (err, docs) => {
    if (err) {
      throw new Error(err);
    }
    responseHandler.success(res, docs);
  });
};

export const fetchOppurtunityByID = (req, res) => {
  Oppurtunity.findById(req.params.id, (err, docs) => {
    if (err) {
      throw new Error(err);
    }
    if (!docs) {
      return responseHandler.error(res, 'Oppurtunity not found!', 404);
    }
    return responseHandler.success(res, docs);
  });
};

export const updateOppurtunity = (req, res) => {
  Oppurtunity.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, docs) => {
      if (err) {
        throw new Error(err);
      }
      if (!docs) {
        return responseHandler.error(res, 'Oppurtunity not found!', 404);
      }
      return responseHandler.success(res, docs);
    }
  );
};

export const deleteOppurtunity = (req, res) => {
  Oppurtunity.findByIdAndRemove(req.params.id, (err, docs) => {
    if (err) {
      throw new Error(err);
    }
    if (!docs) {
      return responseHandler.error(res, 'Oppurtunity not found!', 404);
    }
    // eslint-disable-next-line no-underscore-dangle
    return responseHandler.success(res, { _id: docs._id });
  });
};
