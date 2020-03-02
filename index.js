/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
const express = require('express');
const path = require('path');

const logger = require('morgan');
const { GraphQLSimpleCache } = require('graphql-simple-cache');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const webpush = require('web-push');

const connectDB = require('./api/Configuration/db');
const index = require('./api/Routes/index');
const users = require('./api/Routes/users');
const internships = require('./api/Routes/internships');
const testimonial = require('./api/Routes/testimonial');
const teamMember = require('./api/Routes/teamMember');
const redis = require('./api/Utils/redisDb');

// const publicVapidKey = process.env.PUBLIC_VAPID_KEY;
// const privateVapidKey = process.env.PRIVATE_VAPID_KEY;

// // // Replace with your email
// webpush.setVapidDetails('mailto:divyanshu.r46956@gmail.com', publicVapidKey, privateVapidKey);

const app = express();
let cache = new GraphQLSimpleCache(redis);

app.use('/', (req, res, next) => {
  if (redis.connected === false) {
    cache = new GraphQLSimpleCache();
    redis.connected = null;
  }
  req.cache = cache;
  return next();
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// eslint-disable-next-line consistent-return
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  next();
});

app.post('/subscribe', (req, res) => {
  const subscription = req.body;
  res.status(200).json({});
  const payload = JSON.stringify({ title: 'Greetings by Igntius!' });
  webpush
    .sendNotification(subscription, payload)
    .then(() => {
      console.log(
        'sendNotification success',
        JSON.stringify({ title: 'Greetings by Igntius!' }),
      );
    })
    .catch((error) => {
      console.error('sendNotification ERROR', error.stack);
    });
});

app.use('/', index);
app.use('/', users);
app.use('/', internships);
app.use('/', testimonial);
app.use('/', teamMember);

const PORT = process.env.PORT || 3000;
connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`Our app is running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('App starting error:', err.stack);
    process.exit(1);
  });

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
});

module.exports = app;
