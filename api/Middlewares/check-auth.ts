/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
import jwt from 'jsonwebtoken';
import { config } from '../Configuration/config';
import { Request, Response, NextFunction } from 'express';

export const verifyOrdinaryUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token: string =
    req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, config.secretKey, (err: any, decrypted: any) => {
      if (err) {
        throw new Error(err);
      }
      req.decrypted = decrypted;
      next();
    });
  } else {
    res.json({
      statusCode: 500,
      success: false,
      message: 'No token provided!'
    });
  }
};

export const verifyStudent = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token =
    req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, config.secretKey, (err: any, decrypted: any) => {
      if (err) {
        throw new Error(err);
      }
      if (decrypted.userType === 'student') {
        req.decrypted = decrypted;
        next();
      } else {
        res.json({
          statusCode: 403,
          success: false,
          message: 'You are not authorized to perform this operation !'
        });
      }
    });
  } else {
    res.json({
      statusCode: 500,
      success: false,
      message: 'No token provided!'
    });
  }
};

/* Next middleware to-hop-in :) */
export const verifyAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.decrypted?.admin) {
    next();
  } else {
    res.json({
      statusCode: 500,
      success: false,
      message:
        'You are not authorized to perform this operation, Only admins are authorized!'
    });
  }
};
