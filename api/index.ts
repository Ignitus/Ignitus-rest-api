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
import connectDB from './Configuration/db.js';
import { config } from './Configuration/config.js';

/* application routes. */
import userRouter from './Routes/usersRouter.js';
import opportunityRouter from './Routes/opportunityRouter.js';
import studentRouter from './Routes/studentRouter.js';
import professorRouter from './Routes/professorRouter.js';
import testimonialRouter from './Routes/testimonialRouter.js';
// import teamMembersrouter from './api/Routes/teamMembersrouter.js';
import { CustomError } from './Types/customError';

webPush.setVapidDetails(
  `mailto:${config.privateVapidEmail}`,
  config.publicVapidKey!,
  config.privateVapidKey!
);

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
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.post('/subscribe', (req, res) => {
  const subscription = req.body;
  const payload: string = JSON.stringify({ title: 'Greetings by Igntius!' });
  res.status(200).json({});
  webPush
    .sendNotification(subscription, payload)
    .then(() => {
      console.log(
        'sendNotification success',
        JSON.stringify({ title: 'Greetings by Igntius!' })
      );
    })
    .catch((error: Error) => {
      console.error('sendNotification ERROR', error.stack);
    });
});

app.use('/', studentRouter);
app.use('/', professorRouter);
app.use('/', userRouter);
app.use('/', opportunityRouter);
app.use('/', testimonialRouter);

const PORT = process.env.PORT ?? 3000;
connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`Our app is running on port ${PORT}`));
  })
  .catch((err: Error) => {
    process.exit(1);
  });

app.use((req, res, next): void => {
  const err: CustomError = new CustomError('Not Found', 604);
  next(err);
});

app.use((err: any, req: any, res: any): void => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
});

export default app;
