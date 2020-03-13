/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
import express from 'express';
import path from 'path';

/* for additional logging. */
import logger from 'morgan'; 

/* for push notification. */
import webPush from 'web-push';

/* parsing middlewares. */
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

/* db connection/envs. */
import connectDB from './api/Configuration/db.js';
import { config } from './api/Configuration/config.js';

/* application routes. */
import userRouter from './api/Routes/usersRouter.js';
import opportunityRouter from './api/Routes/opportunityRouter.js';
import studentRouter from './api/Routes/studentRouter.js';
import professorRouter from './api/Routes/professorRouter.js';
import testimonialRouter from './api/Routes/testimonialRouter.js';
// import teamMembersrouter from './api/Routes/teamMembersrouter.js';

webPush.setVapidDetails(`mailto:${config.privateVapidEmail}`, config.publicVapidKey, config.privateVapidKey);

const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(path.resolve(), 'public')));

// eslint-disable-next-line consistent-return
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
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

app.use('/', studentRouter);
app.use('/', professorRouter);
app.use('/', userRouter);
app.use('/', opportunityRouter);
app.use('/', testimonialRouter);
// app.use('/', teamMembersrouter);

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

export default app;
