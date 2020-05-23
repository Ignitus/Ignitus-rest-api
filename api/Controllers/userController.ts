/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable max-len */
/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
/* eslint-disable camelcase */

import { Request, Response } from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

/* Temp. not using.
const Linkedin = require('node-linkedin')(
  process.env.LINKEDIN_APP_ID,
  process.env.LINKEDIN_SECRET,
); */
import responseHandler from '../Utils/responseHandler';
import { config } from '../Configuration/config';

/*
 * Feature Request Update, Not Needed atm.
 * Snippet was a part of email verification after registration.
const nodemailer = require('nodemailer');
const smtpTransport = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});
*/

import Professor from '../Models/professorModel.js';
import Student from '../Models/studentModel.js';
import { User } from '../Models/userModel';
import { InterfaceUserModel } from 'api/Models/@modelTypes/interfaceUserModel';
import { TokenType } from './@controllerTypes/interfaceToken';

// const scope = ['r_basicprofile', 'r_emailaddress'];
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
    user.linkedin.profileUrl &&
    user.linkedin.accessToken
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

const profileDataInsertion = (email: string, userType: string) => {
  let profile;
  if (userType === 'student') {
    profile = new Student({
      _id: new mongoose.Types.ObjectId(),
      email,
    });
  } else if (userType === 'professor') {
    profile = new Professor({
      _id: new mongoose.Types.ObjectId(),
      email,
    });
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
    } else if (user && user.linkedin.profileUrl) {
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
          profileDataInsertion(email, userType)?.then(() => {
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
    (err: Error, user: InterfaceUserModel) => {
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
              const token = jwt.sign(
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
              return responseHandler.success(res, { token, clientData });
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

export const getUserInformationFromToken = (req: Request, res: Response) => {
  if (
    (req.headers && req.headers.authorization) ||
    req.body.token ||
    req.headers['x-access-token']
  ) {
    const authorization: string =
      req.headers.authorization ||
      req.body.token ||
      req.headers['x-access-token'];
    try {
      const decodedToken = jwt.verify(
        authorization,
        config.secretKey,
      ) as TokenType;

      User.findOne({
        _id: decodedToken.userId,
      })
        .then((user: any) => {
          const { email, userType } = user;
          return responseHandler.success(res, {
            email,
            userType,
          });
        })
        .catch(err => responseHandler.error(res, err.message, 404));
    } catch (err) {
      responseHandler.error(res, err.message, 404);
    }
  } else {
    return responseHandler.error(res, 'Unauthorized!', 401);
  }
};

/*
export const forgotPassword = (req, res) => {
  if (req.body.email === '') {
    responseHandler.error(res, 'Email required!', 400);
  }
  User.findOne({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user) {
        const token = crypto.randomBytes(20).toString('hex');
        user
          .update({
            resetPasswordToken: token,
            resetPasswordExpires: Date.now() + 360000,
          })
          .exec();
        // Send the mail to user's e-mail id.
        const host = req.get('host');
        const link = `http://${host}/reset?token=${token}`;
        const mailOptions = {
          to: req.body.email,
          subject: 'Link To Reset Password',
          html:
            '<h3>Welcome to Ignitus!</h3>'
            + '<p>You are receiving this because you (or someone else) have requested the reset of the password for your account.</p>'
            + '<p>Please click on the following link, to complete the process within one hour of receiving it:</p>'
            + `<a href=${link}>Reset password</a>`
            + '<p>If you did not request this, please ignore this email and your password will remain unchanged.</p>'
            + '<p>Sincerely</p>'
            + '<p>Team Ignitus</p>'
            + '<p><a href=`https://www.ignitus.org/`>https://www.ignitus.org/</a></p>',
        };
        smtpTransport.sendMail(mailOptions, (error, response) => {
          if (error) {
            return responseHandler.error(res, error.message, 500);
          }
          return responseHandler.success(res, response);
        });
      } else {
        responseHandler.error(res, 'Email not found.', 400);
      }
    });
};

export const resetPassword = (req, res) => {
  User.findOne({
    resetPasswordToken: req.query.token,
    resetPasswordExpires: {
      $gt: Date.now(),
    },
  })
    .exec()
    .then((user) => {
      if (user) {
        return res.redirect(
          `http://www.ignitus.org/resetPassword?token=${req.query.token}&email=${user.email}`,
        );
      }
      return res
        .status(403)
        .send(
          "<p>Password reset link is invalid or has expired.</p><p><a href='http://www.ignitus.org/forgotPassword'>Click here</a> to recover your account</p>",
        );
    })
    .catch((err) => {
      responseHandler.error(res, err, 'Invalid token.');
    });
};

export const updatePassword = (req, res) => {
  User.findOne({
    email: req.body.email,
    resetPasswordToken: req.body.token,
    resetPasswordExpires: {
      $gt: Date.now(),
    },
  })
    .exec()
    .then((user) => {
      if (user == null) {
        return responseHandler.error(res, 'User does not exist.', 403);
      }
      bcrypt
        .hash(req.body.password, 10)
        .then((hash) => {
          user
            .update({
              password: hash,
              resetPasswordToken: null,
              resetPasswordExpires: null,
            })
            .exec();
        })
        .then(responseHandler.success(res, { message: 'Password updated.' }))
        .catch(err => responseHandler.error(res, err));
    })
    .catch(error => responseHandler.error(res, error));
};

*/

/* User verification disabled for now.
exports.verify = (req, res) => {
  if (`${req.protocol}://${req.get('host')}` === `http://${host}`) {
    console.log('Domain is matched. Information is from Authentic email');
    User.find(
      { email: req.body.email, verifytoken: req.body.id },
      (err) => {
        if (!err) {
          console.log('email is isUserVerified and token isUserVerified');
          const newvalues = { $set: { isUserVerified: 1 } };
          const query = { email: req.query.email };
          User.updateOne(query, newvalues, (error, result) => {
            if (error) {
              return responseHandler.error(err);
            }
            res.redirect('http://www.ignitus.org/login/student');
            return responseHandler.success(result);
          });
        } else {
          return responseHandler.error(err);
        }
      },
    );
  } else {
    return responseHandler.error(res);
  }
};
*/

/*
exports.studentlinkedlogin = (req, res) => {
  Linkedin.setCallback('http://ignitus.org/student/oauth/linkedin/callback');
  Linkedin.auth.authorize(res, scope);
};

// LinkedIn login-callback.
function linkedinlogin(req, res, userType) {
  Linkedin.auth.getAccessToken(
    res,
    req.query.code,
    req.query.state,
    (err, result) => {
      if (err) throw err;

      const { accessToken } = result;
      const linkedin_user = Linkedin.init(accessToken);
      linkedin_user.people.me((error, data) => {
        if (error) throw error;

        const user_email = data.emailAddress;
        const user_linked_profile = data.publicProfileUrl;
        // User existence check.
        req.cache
          .load({
            options: { email: user_email },
            loader: opts => User.find(opts).exec(),
          })
          .then((response) => {
            if (result.length > 0) {
              const token = jwt.sign(
                {
                  email: response[0].email,
                  userType: user.userType,
                  userId: response[0]._id,
                },
                config.secretKey,
                { expiresIn: '1h' },
              );
              return responseHandler.success(res, { token });
            }
          });

        // New user creation.
        const user = new User({
          _id: new mongoose.Types.ObjectId(),
          email: user_email,
          userType,
          isUserVerified: 1,
          linkedin: {
            profileUrl: user_linked_profile,
            accessToken,
          },
        });
        // Save user.
        user.save().then(() => {
          profileDataInsertion(req.body.email, userType);
          req.cache
            .load({
              options: { email: user_email },
              loader: opts => User.find(opts).exec(),
            })
            // eslint-disable-next-line no-shadow
            .then((result) => {
              if (result.length > 0) {
                const token = jwt.sign(
                  {
                    email: result[0].email,
                    userType: user.userType,
                    userId: result[0]._id,
                  },
                  config.secretKey,
                  { expiresIn: '1h' },
                );
                return responseHandler.success(res, { token });
              }
            });
        });
      });
      // console.log(results.accessToken);
    },
  );
}
// Linkedin student login-callback.
exports.studentlinkedlogincallback = (req, res) => {
  linkedinlogin(req, res, 'student');
};

// Linkedin professor login-controller.
exports.professorlinkedlogin = (req, res) => {
  Linkedin.setCallback('http://ignitus.org/professor/oauth/linkedin/callback');
  Linkedin.auth.authorize(res, scope);
};
// Linkedin professor login-callback.
exports.professorlinkedlogincallback = (req, res) => {
  linkedinlogin(req, res, 'professor');
}; */
