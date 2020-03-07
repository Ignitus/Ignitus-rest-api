/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */

import Oppurtunity from '../Models/opportunityModel.js'
import responseHandler from '../Utils/responseHandler.js';

export const addOppurtunity = (req, res) => {
  Oppurtunity.create(req.body, err => (err ? responseHandler.error(res) : responseHandler.success(res)));
};

export const fetchAllOpportunities = (req, res) => {
  Oppurtunity.find({}, (err, docs) => (err
    ? responseHandler.error(res)
    : responseHandler.success(res, { internship: docs })));
};

export const fetchOppurtunityById = (req, res) => {
  Oppurtunity.findById(req.params.id, (err, docs) => (!err && docs
    ? responseHandler.success(res, docs)
    : responseHandler.error(res, 'Oppurtunity not found', 404)));
};

export const updateOppurtunity = (req, res) => {
  Oppurtunity.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, docs) => {
      if (err || !docs) {
        return err
          ? responseHandler.error(res)
          : responseHandler.error(res, 'Oppurtunity not found', 404);
      }
      return responseHandler.success(res, docs);
    },
  );
};

export const deleteOppurtunity = (req, res) => {
  Oppurtunity.findByIdAndRemove(req.params.id, (err, doc) => {
    if (err || !doc) {
      return err
        ? responseHandler.error(res)
        : responseHandler.error(res, 'Oppurtunity not found', 404);
    }
    return responseHandler.success(res, { _id: doc._id });
  });
};
