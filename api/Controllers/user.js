/* eslint-disable max-len */
/* eslint-disable brace-style */
/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
/* eslint-disable new-cap */
/* eslint-disable camelcase */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const Linkedin = require('node-linkedin')(
  process.env.LINKEDIN_APP_ID,
  process.env.LINKEDIN_SECRET,
);
const nodemailer = require('nodemailer');
const responseHandler = require('../Utils/responseHandler');

const smtpTransport = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

/*
 * Feature Reuest Update, Not Neede atm.

const nodemailer = require('nodemailer');
const smtpTransport = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

*/
const { professorProfile } = require('../Models/professorProfile');
const { studentProfile } = require('../Models/studentProfile');
const { Users } = require('../Models/user');

const scope = ['r_basicprofile', 'r_emailaddress'];
const secret = 'secret';

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
// inserting data into student profile or professor profile
function profileDataInsertion(email, user_role) {
  let profile;
  if (user_role === 'student') {
    profile = new studentProfile({
      _id: new mongoose.Types.ObjectId(),
      email,
    });
  } else if (user_role === 'professor') {
    profile = new professorProfile({
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
        /* If the user is registered via socialMediaLogin and is trying to register via Email login. */
        socialLoginCheck(req, res, user_role, data);
      } else if (data.length >= 1 /* && data[0].verified === 1 */) {
        return responseHandler.error(res, 'User already exists!.', 409);
      } else {
        /* Email verification disabled.
      else if (data.length >= 1 && data[0].verified === 0) {
        return responseHandler.error(res, 'Email ID not verified', 401);
      }
      */
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return responseHandler.error(res, err);
          }
          let rand = Math.floor(Math.random() * 100 + 54);
          rand = rand.toString();
          const token = crypto
            .createHash('md5')
            .update(rand)
            .digest('hex');

          const user = new Users({
            _id: new mongoose.Types.ObjectId(),
            email: req.body.email,
            password: hash,
            user_role,
            verified: 0,
            verifytoken: token,
          });
          user
            .save()
            .then((response) => {
              profileDataInsertion(req.body.email, user_role).then(() => responseHandler.success(res, response));

              /* Email verification disabled durning registration.
              rand = Math.floor(Math.random() * 100 + 54);
              host = req.get('host');
              link = `http://${req.get('host')}/verify?id=${val}&email=${
                req.body.email
              }`;
              mailOptions = {
                to: req.body.email,
                subject: 'Please confirm your Email account',
                html: `<h3>Welcome to Ignitus!</h3>
                       <p>We're glad to have you here.</p>
                       <p>Next, please verify your email address using the following link <a href=${link}>verify</a>,
                       then log in using your email and the password
                       that you set.<p>

                       If you did not request an account at www.ignitus.org, you can safely ignore this email.

                       <p>Sincerely</p>
                       <p>Team Ignitus</p>
                       <p><a href='https://www.ignitus.org/'>https://www.ignitus.org/</a></p>`,
              };

              smtpTransport.sendMail(mailOptions, (error, response) => {
                if (error) {
                  // removing the in case mail is not send
                  Users.findOneAndRemove({ email: req.body.email })
                    .exec()
                    .then((result) => {
                      console.log(error);
                      // res.end("error unable to send verification email.");
                      return responseHandler.error(res, 'Unable to send mail');
                    });
                } else {
                  profileDataInsertion(req.body.email, user_role);
                  return responseHandler.success(res);
                }
              }); */
            })
            .catch(error => responseHandler.error(res, error));
        });
      }
    });
}

exports.studentRegister = (req, res) => {
  register(req, res, 'student');
};

exports.professorRegister = (req, res) => {
  register(req, res, 'professor');
};

exports.login = (req, res) => {
  req.cache
    .load({
      options: { email: req.body.email },
      loader: opts => Users.find(opts).exec(),
    })
    .then((data) => {
      if (data.length < 1) {
        return responseHandler.error(res, 'Invalid user!.', 401);
      }
      /* Email verification disabled.
        if (data.length === 1 && data[0].verified === 0) {
          return responseHandler.error(res, 'Email ID not verified', 401);
        }
      */
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
            },
            secret,
            { expiresIn: '1h' },
          );

          const clientData = {
            email: data[0].email,
            user_role: data[0].user_role,
          };

          return responseHandler.success(res, { token }, { clientData });
        }
        return responseHandler.error(res, 'Wrong password.', 401);
      });
    })
    .catch(err => responseHandler.error(res, err));
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

// Linkedin LogIn.
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
                secret,
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
                  secret,
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
};

exports.getUserInfoFromToken = (req, res) => {
  if ((req.headers && req.headers.authorization) || req.body.token) {
    const authorization = req.headers.authorization || req.body.token;
    try {
      const decodedToken = jwt.verify(authorization, secret);
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

// Forgot password-handler.
exports.forgotPassword = (req, res) => {
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

// Password reset handler.
exports.resetPassword = (req, res) => {
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

// Password update handler
exports.updatePassword = (req, res) => {
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
