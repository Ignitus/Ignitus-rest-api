
const mongoose = require('mongoose');


const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const Linkedin = require('node-linkedin')('81akrst1faj5nl', 'HVgpZ5vjF5gM1A3N');
const responseHandler = require('../helper/responseHandler');
// mailing credentials
const smtpTransport = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: '',
    pass: '',
  },
});
const { ProfessorProfile } = require('../models/professor_profile');
const { StudentProfile } = require('../models/student_profile');
const { Users } = require('../models/user');

const scope = ['r_basicprofile', 'r_emailaddress'];
let mailOptions; let host; let link;
const secret = 'secret';

// check if a registering user is already registered using social login
function socialLoginCheck(req, res, userRole, data) {
  if (data.length >= 1 && data[0].verified === 1
    && (userRole === data[0].userRole) && !(data[0].password)
        && data[0].linkedin.profile_url && data[0].linkedin.access_token) {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      if (err) {
        return responseHandler.error(res);
      }
      Users.update({ email: req.body.email }, { $set: { password: hash } }, (updateErr) => {
        if (updateErr) {
          return responseHandler.error(res);
        }
        return responseHandler.success(res);
      });
      return null;
    });
  }
}
// inserting data into student profile or professor profile
function profileDataInsertion(email, userRole) {
  let profile;
  if (userRole === 'student') {
    profile = new StudentProfile({
      _id: new mongoose.Types.ObjectId(),
      email,
    });
  } else if (userRole === 'professor') {
    profile = new ProfessorProfile({
      _id: new mongoose.Types.ObjectId(),
      email,
    });
  }
  profile.save();
}
// register function

function register(req, res, userRole) {
  Users.find({ email: req.body.email })
    .exec()
    .then((data) => {
      if (data.length >= 1 && data[0].verified === 1
            && (userRole === data[0].userRole) && !(data[0].password)
            && data[0].linkedin.profile_url && data[0].linkedin.access_token) {
        // if the user is registered via social login and the trying to register via normal login
        socialLoginCheck(req, res, userRole, data);
      } else if (data.length >= 1 && data[0].verified === 1) {
        // user already exists
        return responseHandler.error(res, 'User already exists', 409);
      } else if (data.length >= 1 && data[0].verified === 0) {
        // user has not verified mail
        return responseHandler.error(res, 'Email ID not verified', 401);
      } else {
        // register the user
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
            userRole,
            verified: 0,
            verifytoken: val,

          });
          user.save()
            .then(() => {
              // sending the mail to users mail id
              rand = Math.floor((Math.random() * 100) + 54);
              host = req.get('host');
              link = `http://${req.get('host')}/verify?id=${val}&email=${req.body.email}`;
              mailOptions = {
                to: req.body.email,
                subject: 'Please confirm your Email account',
                html: `Hello,<br> Please Click on the link to verify your email.<br><a href=${link}>Click here to verify</a>`,
              };

              smtpTransport.sendMail(mailOptions, (error) => {
                if (error) {
                  // removing the in case mail is not send
                  Users.findOneAndRemove({ email: req.body.email }).exec()
                    .then(() => {
                      /* eslint-disable no-console */
                      console.log(error);
                      // res.end("error unable to send verification email.");
                      return responseHandler.error(res, 'Unable to send mail');
                    });
                } else {
                  profileDataInsertion(req.body.email, userRole);
                  return responseHandler.success(res);
                }
                return null;
              });
            })
            .catch(() => responseHandler.error(res));
          return null;
        });
      }
      return null;
    });
}
// student register controller
exports.studentRegister = (req, res) {
  register(req, res, 'student');
};
// professor register controller
exports.professorRegister = (req, res) {
  register(req, res, 'professor');
};

// normal login controller

exports.login = (req, res) => {
  Users.find({ email: req.body.email })
    .exec()
    .then((data) => {
      // user account does not exists
      if (data.length < 1) {
        return responseHandler.error(res, 'Invalid user', 401);
      }
      // email not verfied
      if (data.length === 1 && data[0].verified === 0) {
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
            userRole: data[0].userRole,
            /* eslint-disable no-underscore-dangle */
            userId: data[0]._id,
          },
          secret,
          { expiresIn: '1h' });
          return responseHandler.success(res, { token });
        }
        return responseHandler.error(res, 'Wrong password', 401);
      });
      return null;
    })
    .catch(() => responseHandler.error(res));
};

// email verification
exports.verify = (req, res) => {
  if ((`${req.protocol}://${req.get('host')}`) === (`http://${host}`)) {
    /* eslint-disable no-console */
    console.log('Domain is matched. Information is from Authentic email');
    Users.find({ email: req.body.email, verifytoken: req.body.id }, (err) => {
      if (!err) {
        console.log('email is verified and token verified');
        // console.log(query);

        const newvalues = { $set: { verified: 1 } };
        // console.log(newvalues);
        // console.log(req.query.email);
        const query = { email: req.query.email };
        Users.update(query, newvalues, (updateErr) => {
          if (updateErr) {
            return responseHandler.error(res);
          }

          return responseHandler.success(res);
        });
      } else {
        return responseHandler.error(res);
      }
      return null;
    });
  } else {
    return responseHandler.error(res);
  }
  return null;
};

// linkedin student login controller
exports.studentlinkedlogin = (req, res) => {
  Linkedin.setCallback('http://localhost:3000/student/oauth/linkedin/callback');
  Linkedin.auth.authorize(res, scope);
};

// linked login callback
function linkedinlogin(req, res, userRole) {
  Linkedin.auth.getAccessToken(res, req.query.code, req.query.state, (err, results) => {
    if (err) return console.error(err);

    const token = results.access_token;
    const linkedinUser = Linkedin.init(token);
    linkedinUser.people.me((meErr, data) => {
      const userEmail = data.emailAddress;
      const userLinkedinProfile = data.publicProfileUrl;
      const accessToken = results.access_token;

      // finding if the user already exists
      Users.find({ email: userEmail })
        .exec()
        .then((result) => {
          if (result.length > 0) {
            const userToken = jwt.sign({
              email: result[0].email,
              userRole: data[0].userRole,
              /* eslint-disable no-underscore-dangle */
              userId: result[0]._id,
            },
            secret,
            { expiresIn: '1h' });
            return responseHandler.success(res, { userToken });
          }
          return null;
        });
      // creating a new user if not found
      const user = new Users({
        _id: new mongoose.Types.ObjectId(),
        email: userEmail,
        userRole,
        verified: 1,
        linkedin: {
          profile_url: userLinkedinProfile,
          access_token: accessToken,
        },
      });
      // saving the user
      user.save()
        .then(() => {
          profileDataInsertion(req.body.email, userRole);
          // logging in the new user
          Users.find({ email: userEmail })
            .exec()
            .then((result) => {
              if (result.length > 0) {
                const findToken = jwt.sign({
                  email: result[0].email,
                  userRole: data[0].userRole,
                  userId: result[0]._id,
                },
                secret,
                { expiresIn: '1h' });
                return responseHandler.success(res, { findToken });
              }
              return null;
            });
        });
    });
    // console.log(results.access_token);
    return null;
  });
}
// linkedin student login callback
exports.studentlinkedlogincallback = (req, res) => {
  linkedinlogin(req, res, 'student');
};

// linkedin professor login controller
exports.professorlinkedlogin = (req, res) => {
  Linkedin.setCallback('http://localhost:3000/professor/oauth/linkedin/callback');
  Linkedin.auth.authorize(res, scope);
};
// linkedin professor login callback
exports.professorlinkedlogincallback = (req, res) => {
  linkedinlogin(req, res, 'professor');
};
