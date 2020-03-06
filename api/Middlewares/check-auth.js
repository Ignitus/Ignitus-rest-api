/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
import jwt from 'jsonwebtoken';
import { config } from '../Configuration/config.js';

exports.verifyOrdinaryUser = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, config.secretKey, (err, decoded) => {
      if (err) {
        return next(err);
      }
      req.decoded = decoded;
      next();
    });
  } else {
    res.json({
      statusCode: 500,
      success: false,
      message: 'No token provided!',
    });
  }
};

exports.verifyStudent = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, config.secretKey, (err, decoded) => {
      if (err) {
        return next(err);
      }
      if (decoded.user_role === 'student') {
        req.decoded = decoded;
        next();
      } else {
        res.json({
          statusCode: 403,
          success: false,
          message: 'You are not authorized to perform this operation !',
        });
      }
    });
  } else {
    res.json({
      statusCode: 500,
      success: false,
      message: 'No token provided!',
    });
  }
};

/* Next middleware to-hop-in :) */
exports.verifyAdmin = (req, res, next) => {
  if (req.decoded.admin) {
    next();
  } else {
    res.json({
      statusCode: 500,
      success: false,
      message: 'You are not authorized to perform this operation, Only admins are authorized!',
    });
  }
};
