/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../Configuration/config';
import { responseHandler } from '../Utils/responseHandler';

export const verifyOrdinaryUser = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token: string =
    req.body.token || req.query.token || req.headers['x-access-token'];

  if (token) {
    try {
      const decryptedToken = <TokenType>jwt.verify(token, config.secretKey);
      req.decrypted = decryptedToken;
      next();
    } catch (err) {
      return responseHandler.error(res, err.message, 401);
    }
  } else {
    return responseHandler.error(res, 'No token provided!', 401);
  }
};

export const verifyStudent = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token: string =
    req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    try {
      const decryptedToken: TokenType = <TokenType>(
        jwt.verify(token, config.secretKey)
      );
      if (decryptedToken.userType === 'student') {
        req.decrypted = decryptedToken;
        next();
      } else {
        res.json({
          statusCode: 403,
          success: false,
          message: 'You are not authorized to perform this operation !',
        });
      }
    } catch (err) {
      return responseHandler.error(res, err.message, 401);
    }
  } else {
    return responseHandler.error(res, 'No token provided!', 401);
  }
};

/* Next middleware to-hop-in :) */
export const verifyAdmin = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.decrypted?.admin) {
    next();
  } else {
    res.json({
      statusCode: 500,
      success: false,
      message: 'Not authorized!',
    });
  }
};
