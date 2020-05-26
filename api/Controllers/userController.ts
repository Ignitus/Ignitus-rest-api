/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
/* eslint-disable camelcase */

import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { Request, Response } from 'express';

import { User } from '../Models/userModel';
import { Professor } from '../Models/professorModel';
import { Student } from '../Models/studentModel';
import { InterfaceUserModel } from 'api/Models/@modelTypes/interfaceUserModel';
import { TokenType } from './@controllerTypes/interfaceToken';
import { config } from '../Configuration/config';
import { responseHandler } from '../Utils/responseHandler';

/* If the user is already registered through LinkedIn & trying to register through email. */
function socialLoginCheck(
  req: Request,
  res: Response,
  userType: string,
  user: InterfaceUserModel,
) {
  if (
    /* && user.isUserVerified === 1 */
    userType === user.userType &&
    !user.password &&
    user.oAuth.linkedIn.profileUrl &&
    user.oAuth.linkedIn.accessToken
  ) {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      if (err) {
        return responseHandler.error(res, err.message, 400);
      }
      User.update(
        { email: req.body.email },
        { $set: { password: hash } },
        (error, result) => {
          if (error) {
            throw new Error(err);
          }
          return responseHandler.success(res, result);
        },
      );
    });
  }
}

const profileDataInsertion = (userType: string) => {
  let profile;
  if (userType === 'student') {
    profile = new Student({});
  } else if (userType === 'professor') {
    profile = new Professor({});
  }
  return profile?.save();
};

export const register = (req: Request, res: Response) => {
  const {
    body: { email, userType, password },
  } = req;
  User.findOne({ email }, (err: Error, user: InterfaceUserModel) => {
    if (err) {
      return responseHandler.error(res, err.message, 400);
    } else if (user && user.oAuth.linkedIn.profileUrl) {
      socialLoginCheck(req, res, userType, user);
    } else if (user) {
      return responseHandler.error(res, 'User already exists!', 409);
    } else {
      bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
          return responseHandler.error(res, err.message, 400);
        }
        const randomNumberGeneration = Math.floor(
          Math.random() * 100 + 54,
        ).toString();
        const accessToken: string = crypto
          .createHash(config.hashingType)
          .update(randomNumberGeneration)
          .digest(config.hashingDigest);
        const user = new User({
          _id: new mongoose.Types.ObjectId(),
          email,
          password: hashedPassword,
          userType,
          verifytoken: accessToken,
        });
        user.save().then(_ => {
          profileDataInsertion(userType)?.then(() => {
            res.json({
              statusCode: 200,
              success: true,
              message: 'Success',
            });
          });
        });
      });
    }
  });
};

export const login = (req: Request, res: Response) => {
  User.findOne(
    { email: req.body.email },
    (err: Error, user: InterfaceUserModel | null) => {
      if (err || !user) {
        if (err) {
          return responseHandler.error(res, err.message, 400);
        } else {
          return responseHandler.error(res, 'User not found!', 401);
        }
      } else {
        const { email, userType, _id, admin } = user;
        if (req.body.userType === userType) {
          bcrypt.compare(req.body.password, user.password, (err, result) => {
            if (err) {
              return responseHandler.error(res, err.message, 400);
            }
            if (result) {
              const jwtToken: string = jwt.sign(
                {
                  email,
                  userType,
                  userId: _id,
                  admin: admin || false,
                },
                config.secretKey,
                { expiresIn: '4h' },
              );
              const clientData = {
                email,
                userType,
              };
              return responseHandler.success(res, { jwtToken, clientData });
            }
            return responseHandler.error(res, 'Incorrect password!', 401);
          });
        } else {
          return responseHandler.error(res, 'Unauthorized access denied!', 403);
        }
      }
    },
  );
};

export const getUserInformationFromToken = async (
  req: Request,
  res: Response,
) => {
  if (req.headers && req.headers.authorization) {
    try {
      const decryptedToken: TokenType = <TokenType>(
        jwt.verify(req.headers.authorization, config.secretKey)
      );
      try {
        const userObject: InterfaceUserModel | null = await User.findOne({
          _id: decryptedToken.userId,
        });
        res.json({
          userObject,
        });
      } catch (err) {
        return responseHandler.error(res, err.message, 404);
      }
    } catch (err) {
      return responseHandler.error(res, err.message, 401);
    }
  } else {
    return responseHandler.error(res, 'No token provided! 💭', 401);
  }
};
