/* eslint-disable max-len */
/* eslint-disable brace-style */
/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
/* eslint-disable new-cap */
/* eslint-disable camelcase */

import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

/* Temp. not using.
const Linkedin = require('node-linkedin')(
  process.env.LINKEDIN_APP_ID,
  process.env.LINKEDIN_SECRET,
);*/
import responseHandler from '../Utils/responseHandler.js';
import { config } from '../Configuration/config.js';

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
import Users from '../Models/user.js';

// const scope = ['r_basicprofile', 'r_emailaddress'];

function socialLoginCheck(req, res, user_role, data) {
  if (
    data.length >= 1
    /* && data[0].verified === 1 */
    && user_role === data[0].user_role
    && !data[0].password
    && data[0].linkedin.profile_url
    && data[0].linkedin.access_token
  ) {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      if (err) {
        return responseHandler.error(res, err);
      }
      Users.update(
        { email: req.body.email },
        { $set: { password: hash } },
        (error, result) => {
          if (error) {
            return responseHandler.error(res, error);
          }
          return responseHandler.success(res, result);
        },
      );
    });
  }
}

function profileDataInsertion(email, user_role) {
  let profile;
  if (user_role === 'student') {
    profile = new Student({
      _id: new mongoose.Types.ObjectId(),
      email,
    });
  } else if (user_role === 'professor') {
    profile = new Professor({
      _id: new mongoose.Types.ObjectId(),
      email,
    });
  }
  return profile.save();
}

function register(req, res, user_role) {
  Users.find({ email: req.body.email })
    .exec()
    .then((data) => {
      if (
        data.length >= 1
        && user_role === data[0].user_role
        && !data[0].password
        && data[0].linkedin.profile_url
        && data[0].linkedin.access_token
      ) {
        /* If the user is already registered through LinkedIn & trying to register through email. */
        socialLoginCheck(req, res, user_role, data);
      } else if (data.length >= 1) {
        return responseHandler.error(res, 'User already exists!.', 409);
      } else {
        bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
          if (err) {
            return responseHandler.error(res, err);
          }
          const randomNumberGeneration = Math.floor(
            Math.random() * 100 + 54,
          ).toString();
          const accessToken = crypto
            .createHash(config.hashingType)
            .update(randomNumberGeneration)
            .digest(config.hashingDigest);

          const user = new Users({
            _id: new mongoose.Types.ObjectId(),
            email: req.body.email,
            password: hashedPassword,
            user_role,
            verifytoken: accessToken,
          });
          user
            .save()
            .then((response) => {
              profileDataInsertion(req.body.email, user_role).then(() => responseHandler.success(res, response));
            });
        });
      }
    });
}

export const studentRegister = (req, res) => {
  register(req, res, 'student');
};

export const professorRegister = (req, res) => {
  register(req, res, 'professor');
};

export const login = (req, res) => {
  req.cache
    .load({
      options: { email: req.body.email },
      loader: opts => Users.find(opts).exec(),
    })
    .then((data) => {
      if (data.length < 1) {
        return responseHandler.error(res, 'Invalid user!', 401);
      }
      bcrypt.compare(req.body.password, data[0].password, (err, result) => {
        if (err) {
          return responseHandler.error(res, err);
        }
        if (result) {
          const token = jwt.sign(
            {
              email: data[0].email,
              user_role: data[0].user_role,
              userId: data[0]._id,
              admin: data[0].admin || false,
            },
            config.secretKey,
            { expiresIn: '1h' },
          );

          const clientData = {
            email: data[0].email,
            user_role: data[0].user_role,
          };

          return responseHandler.success(res, { token, clientData });
        }
        return responseHandler.error(res, 'Wrong password.', 401);
      });
    })
    .catch(err => responseHandler.error(res, err));
};

export const getUserInfoFromToken = (req, res) => {
  if ((req.headers && req.headers.authorization) || req.body.token) {
    const authorization = req.headers.authorization || req.body.token;
    try {
      const decodedToken = jwt.verify(authorization, config.secretKey);
      Users.findOne({
        _id: decodedToken.userId,
      })
        .then((user) => {
          const { email, user_role } = user;
          return responseHandler.success(res, {
            email,
            user_role,
          });
        })
        .catch(err => responseHandler.error(res, err, 404));
    } catch (e) {
      return responseHandler.error(res, e, 401);
    }
  } else {
    return responseHandler.error(res, 'Unauthorized.', 401);
  }
};

export const forgotPassword = (req, res) => {
  if (req.body.email === '') {
    responseHandler.error(res, 'Email required.', 400);
  }
  Users.findOne({ email: req.body.email })
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
  Users.findOne({
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
  Users.findOne({
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

/* User verification disabled for now.
exports.verify = (req, res) => {
  if (`${req.protocol}://${req.get('host')}` === `http://${host}`) {
    console.log('Domain is matched. Information is from Authentic email');
    Users.find(
      { email: req.body.email, verifytoken: req.body.id },
      (err) => {
        if (!err) {
          console.log('email is verified and token verified');
          const newvalues = { $set: { verified: 1 } };
          const query = { email: req.query.email };
          Users.updateOne(query, newvalues, (error, result) => {
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
function linkedinlogin(req, res, user_role) {
  Linkedin.auth.getAccessToken(
    res,
    req.query.code,
    req.query.state,
    (err, result) => {
      if (err) throw err;

      const { access_token } = result;
      const linkedin_user = Linkedin.init(access_token);
      linkedin_user.people.me((error, data) => {
        if (error) throw error;

        const user_email = data.emailAddress;
        const user_linked_profile = data.publicProfileUrl;
        // User existence check.
        req.cache
          .load({
            options: { email: user_email },
            loader: opts => Users.find(opts).exec(),
          })
          .then((response) => {
            if (result.length > 0) {
              const token = jwt.sign(
                {
                  email: response[0].email,
                  user_role: data[0].user_role,
                  userId: response[0]._id,
                },
                config.secretKey,
                { expiresIn: '1h' },
              );
              return responseHandler.success(res, { token });
            }
          });

        // New user creation.
        const user = new Users({
          _id: new mongoose.Types.ObjectId(),
          email: user_email,
          user_role,
          verified: 1,
          linkedin: {
            profile_url: user_linked_profile,
            access_token,
          },
        });
        // Save user.
        user.save().then(() => {
          profileDataInsertion(req.body.email, user_role);
          req.cache
            .load({
              options: { email: user_email },
              loader: opts => Users.find(opts).exec(),
            })
            // eslint-disable-next-line no-shadow
            .then((result) => {
              if (result.length > 0) {
                const token = jwt.sign(
                  {
                    email: result[0].email,
                    user_role: data[0].user_role,
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
      // console.log(results.access_token);
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