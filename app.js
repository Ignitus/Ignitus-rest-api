require('dotenv').config();
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const webpush = require('web-push');
const index = require('./routes/index');
const users = require('./routes/users');
const internships = require('./routes/internships');
const testimonial = require('./routes/testimonial');
const teamMember = require('./routes/teamMember');

const publicVapidKey = process.env.PUBLIC_VAPID_KEY;
const privateVapidKey = process.env.PRIVATE_VAPID_KEY;

// Replace with your email
webpush.setVapidDetails('mailto:sidbentifraouine@gmail.com', publicVapidKey, privateVapidKey);

const app = express();

// db connection
const db = require('./config/db');

// view engine not required so commented it
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// CORS protection (Cross origin request serve)
// app.use(function (req,res,next) {
//     res.header('Access-Control-Allow-Origin','*');
//     res.header('Access-Control-Allow-Origin','Origin, X-Requested-With, Content_Type,Accept,Authorization');

//     if(req.method==='OPTIONS'){
//         req.header('Access-Control-Allow-Origin', 'PUT,POST,PATCH,GET,DELETE');
//         return res.status(200).json({});
//     }
//     next();
// });

// Routes middleware
app.post('/subscribe', (req, res) => {
  const subscription = req.body;
  res.status(201).json({});
  const payload = JSON.stringify({ title: 'Hello from Backend' });

  webpush
    .sendNotification(subscription, payload)
    .then(() => {
      console.log('sendNotification success');
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

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.render('error');
});

module.exports = app;
