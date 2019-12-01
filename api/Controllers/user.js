
const mongoose = require('mongoose');


const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const responseHandler = require('../Utils/responseHandler');
// mailing credentials
const smtpTransport = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});
const Linkedin = require('node-linkedin')('81akrst1faj5nl', 'HVgpZ5vjF5gM1A3N');
const { professorProfile } = require('../Models/professorProfile');
const { studentProfile } = require('../Models/studentProfile');
const { Users } = require('../Models/user');

const scope = ['r_basicprofile', 'r_emailaddress'];
let rand; let mailOptions; let host; let link;
const secret = 'secret';

// check if a registering user is already registered using social login
function socialLoginCheck(req, res, user_role, data) {
  if (data.length >= 1 && data[0].verified == 1 && (user_role == data[0].user_role) && !(data[0].password)
        && data[0].linkedin.profile_url && data[0].linkedin.access_token) {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      if (err) {
        return responseHandler.error(res);
      }
      Users.update({ email: req.body.email }, { $set: { password: hash } }, (err, result) => {
        if (err) {
          return responseHandler.error(res);
        }
        return responseHandler.success(res);
      });
    });
  }
}
// inserting data into student profile or professor profile
function profileDataInsertion(email, user_role) {
  let profile;
  if (user_role == 'student') {
    profile = new studentProfile({
      _id: new mongoose.Types.ObjectId(),
      email,
    });
  } else if (user_role == 'professor') {
    profile = new professorProfile({
      _id: new mongoose.Types.ObjectId(),
      email,
    });
  }
  profile.save();
}
// register function

function register(req, res, user_role) {
  Users.find({ email: req.body.email })
    .exec()
    .then((data) => {
      if (data.length >= 1 && data[0].verified == 1 && (user_role == data[0].user_role) && !(data[0].password)
                && data[0].linkedin.profile_url && data[0].linkedin.access_token) {
        // if the user is registered via social login and the trying to register via normal login
        socialLoginCheck(req, res, user_role, data);
      } else if (data.length >= 1 && data[0].verified == 1) {
        // user already exists
        return responseHandler.error(res, 'User already exists', 409);
      }
      // user has not verified mail
      else if (data.length >= 1 && data[0].verified == 0) {
        return responseHandler.error(res, 'Email ID not verified', 401);
      }
      // register the user
      else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return responseHandler.error(res);
          }
          // genrating the token for email verification
          let rand = Math.floor((Math.random() * 100) + 54);
          rand = rand.toString();
          const val = crypto.createHash('md5').update(rand).digest('hex');

          const user = new Users({
            _id: new mongoose.Types.ObjectId(),
            email: req.body.email,
            password: hash,
            user_role,
            verified: 0,
            verifytoken: val,

          });
          user.save()
            .then((result) => {
              // sending the mail to users mail id
              rand = Math.floor((Math.random() * 100) + 54);
              host = req.get('host');
              link = `http://${req.get('host')}/verify?id=${val}&email=${req.body.email}`;
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
                  Users.findOneAndRemove({ email: req.body.email }).exec()
                    .then((result) => {
                      console.log(error);
                      // res.end("error unable to send verification email.");
                      return responseHandler.error(res, 'Unable to send mail');
                    });
                } else {
                  profileDataInsertion(req.body.email, user_role);
                  return responseHandler.success(res);
                }
              });
            })
            .catch(err => responseHandler.error(res));
        });
      }
    });
}
// student register controller
exports.studentRegister = function (req, res) {
  register(req, res, 'student');
};
// professor register controller
exports.professorRegister = function (req, res) {
  register(req, res, 'professor');
};

// normal login controller

exports.login = function (req, res) {
  req.cache.load({
    options: { email: req.body.email },
    loader: opts => Users.find(opts).exec(),
  })
    .then((data) => {
      // user account does not exists
      if (data.length < 1) {
        return responseHandler.error(res, 'Invalid user', 401);
      }
      // email not verfied
      if (data.length == 1 && data[0].verified == 0) {
        return responseHandler.error(res, 'Email ID not verified', 401);
      }
      // allow user to log in and send the jwt token

      bcrypt.compare(req.body.password, data[0].password, (err, result) => {
        if (err) {
          return responseHandler.error(res);
        }
        if (result) {
          const token = jwt.sign({
            email: data[0].email,
            user_role: data[0].user_role,
            userId: data[0]._id,
          },
          secret,
          { expiresIn: '1h' });

          const clientData = {
            email: data[0].email,
            user_role: data[0].user_role,
          };

          return responseHandler.success(res, { token }, { clientData });
        }
        return responseHandler.error(res, 'Wrong password', 401);
      });
    })
    .catch(err => responseHandler.error(res));
};

// email verification
exports.verify = function (req, res) {
  if ((`${req.protocol}://${req.get('host')}`) == (`http://${host}`)) {
    console.log('Domain is matched. Information is from Authentic email');
    Users.find({ email: req.body.email, verifytoken: req.body.id }, (err, data) => {
      if (!err) {
        console.log('email is verified and token verified');
        // console.log(query);

        const newvalues = { $set: { verified: 1 } };
        // console.log(newvalues);
        // console.log(req.query.email);
        const query = { email: req.query.email };
        Users.updateOne(query, newvalues, (err, result) => {
          if (err) {
            return responseHandler.error(res);
          }

          res.redirect('http://www.ignitus.org/login/student');
          return responseHandler.success(res);
        });
      } else {
        return responseHandler.error(res);
      }
    });
  } else {
    return responseHandler.error(res);
  }
};

// linkedin student login controller
exports.studentlinkedlogin = function (req, res) {
  Linkedin.setCallback('http://localhost:3000/student/oauth/linkedin/callback');
  Linkedin.auth.authorize(res, scope);
};

// linked login callback
function linkedinlogin(req, res, user_role) {
  Linkedin.auth.getAccessToken(res, req.query.code, req.query.state, (err, results) => {
    if (err) return console.error(err);

    const token = results.access_token;
    const linkedin_user = Linkedin.init(token);
    linkedin_user.people.me((err, data) => {
      const user_email = data.emailAddress;
      const user_linked_profile = data.publicProfileUrl;
      const { access_token } = results;

      // finding if the user already exists
      req.cache.load({
        options: { email: user_email },
        loader: opts => Users.find(opts).exec(),
      })
        .then((result) => {
          if (result.length > 0) {
            const token = jwt.sign({
              email: result[0].email,
              user_role: data[0].user_role,
              userId: result[0]._id,
            },
            secret,
            { expiresIn: '1h' });
            return responseHandler.success(res, { token });
          }
        });
      // creating a new user if not found
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
      // saving the user
      user.save()
        .then((result) => {
          profileDataInsertion(req.body.email, user_role);
          // logging in the new user
          req.cache.load({
            options: { email: user_email },
            loader: opts => Users.find(opts).exec(),
          })
            .then((result) => {
              if (result.length > 0) {
                const token = jwt.sign({
                  email: result[0].email,
                  user_role: data[0].user_role,
                  userId: result[0]._id,
                },
                secret,
                { expiresIn: '1h' });
                return responseHandler.success(res, { token });
              }
            });
        });
    });
    // console.log(results.access_token);
  });
}
// linkedin student login callback
exports.studentlinkedlogincallback = function (req, res) {
  linkedinlogin(req, res, 'student');
};

// linkedin professor login controller
exports.professorlinkedlogin = function (req, res) {
  Linkedin.setCallback('http://localhost:3000/professor/oauth/linkedin/callback');
  Linkedin.auth.authorize(res, scope);
};
// linkedin professor login callback
exports.professorlinkedlogincallback = function (req, res) {
  linkedinlogin(req, res, 'professor');
};

exports.getUserInfoFromToken = function (req, res) {
  if ((req.headers && req.headers.authorization) || req.body.token) {
    const authorization = req.headers.authorization || req.body.token;
    try {
      const decodedToken = jwt.verify(authorization, secret);
      Users.findOne({
        _id: decodedToken.userId,
      }).then((user) => {
        const {
          email,
          user_role,
        } = user;
        return responseHandler.success(res, {
          email,
          user_role,
        });
      })
        .catch(err => responseHandler.error(res, 'User not found', 404));
    } catch (e) {
      return responseHandler.error(res, 'Unauthorized', 401);
    }
  } else {
    return responseHandler.error(res, 'Unauthorized', 401);
  }
};

// Forgot password handler
exports.forgotPassword = function (req, res) {
  if (req.body.email === '') {
    res.status(400).send('email required');
  }
  // console.error(req.body.email);
  Users.findOne({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user === null) {
        // console.error('email not in database');
        res.status(403).send('email not in db');
      } else {
        const token = crypto.randomBytes(20).toString('hex');
        user.update({
          resetPasswordToken: token,
          resetPasswordExpires: Date.now() + 360000,
        })
          .exec();
        // sending the mail to user's mail id
        host = req.get('host');
        link = `http://${req.get('host')}/reset?token=${token}`;
        mailOptions = {
          to: req.body.email,
          subject: 'Link To Reset Password',
          html: '<h3>Welcome to Ignitus!</h3>'
              + '<p>You are receiving this because you (or someone else) have requested the reset of the password for your account.</p>'
              + '<p>Please click on the following link, to complete the process within one hour of receiving it:</p>'
              + `<a href=${link}>Reset password</a>`
              + '<p>If you did not request this, please ignore this email and your password will remain unchanged.</p>'
              + '<p>Sincerely</p>'
              + '<p>Team Ignitus</p>'
              + '<p><a href=`https://www.ignitus.org/`>https://www.ignitus.org/</a></p>',
        };

        // console.log('sending mail');
        smtpTransport.sendMail(mailOptions, (error, response) => {
          if (error) {
            // console.error('there was an error: ', err);
            return responseHandler.error(res, error.message, 500);
          }
          //  console.log('here is the res: ', response);
          return responseHandler.success(res, response);
        });
      }
    });
};

// Password reset handler
exports.resetPassword = function (req, res) {
  Users.findOne({
    resetPasswordToken: req.query.token,
    resetPasswordExpires: {
      $gt: Date.now(),
    },
  })
    .exec()
    .then((user) => {
      if (user == null) {
        // console.error('password reset link is invalid or has expired');
        return res.status(403).send('<p>Password reset link is invalid or has expired.</p><p><a href=\'http://www.ignitus.org/forgotPassword\'>Click here</a> to recover your account</p>');
      }
      return res.redirect(`http://www.ignitus.org/resetPassword?token=${req.query.token}&email=${user.email}`);
    })
    .catch((err) => {
      console.log(err);
      responseHandler.error(res, 'Invalid token');
    });
};

// Password update handler
exports.updatePassword = function (req, res) {
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
        return responseHandler.error(res, 'User does not exist', 403);
      }

      bcrypt
        .hash(req.body.password, 10)
        .then(
          (hash) => {
            user
              .update({
                password: hash,
                resetPasswordToken: null,
                resetPasswordExpires: null,
              }).exec();
          },
        )
        .then(responseHandler.success(res, { message: 'Password updated' }))
        .catch(err => responseHandler.error(res, 'Password could not be updated'));
    })
    .catch(err => responseHandler.error(res));
};
