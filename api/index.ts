/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
/* for additional logging. */
import logger from 'morgan';

/* parsing middlewares. */
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

/* application routes. */
import userRouter from './Routes/usersRouter.js';
import opportunityRouter from './Routes/opportunityRouter.js';
import studentRouter from './Routes/studentRouter.js';
import professorRouter from './Routes/professorRouter.js';
import testimonialRouter from './Routes/testimonialRouter.js';
// import teamMembersrouter from './api/Routes/teamMembersrouter.js';

/* db connection/envs. */
import { connectDB } from './Configuration/db.js';
import { CustomError } from './Types/customError';

const app = express();
const PORT: number | string = process.env.PORT ?? 3000;

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(path.resolve(), 'public')));

// eslint-disable-next-line consistent-return
app.use((req: Request, res: Response, next: NextFunction): void => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.use('/', studentRouter);
app.use('/', professorRouter);
app.use('/', userRouter);
app.use('/', opportunityRouter);
app.use('/', testimonialRouter);

connectDB()
  .then(() => {
    // tslint:disable-next-line: no-console
    app.listen(PORT, () => console.log(`Our app is running on port ${PORT}`));
  })
  .catch((err: Error) => {
    process.exit(1);
  });

app.use((req: Request, res: Response, next: NextFunction): void => {
  const err: CustomError = new CustomError('Not Found', 604);
  next(err);
});

app.use((err: CustomError, req: Request, res: Response): void => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
});

export default app;
