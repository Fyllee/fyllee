import 'source-map-support/register';
import 'module-alias/register';
import 'dotenv/config';

import { promises as fs } from 'fs';

import bodyParser from 'body-parser';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import express from 'express';
import type { Request, Response } from 'express';
import fileUpload from 'express-fileupload';
import helmet from 'helmet';
import mongoose from 'mongoose';
import morgan from 'morgan';
import passport from 'passport';

import constants from './config/constants';
import configPassport from './config/passport';
import existsAsync from './helpers/exists-async';
import message from './middlewares/message';
import requiredParameters from './middlewares/required-parameters';
import index from './routes';

configPassport();

const app = express();

export const port = Number(process.env.PORT) || 5050;
export const baseUrl = `http://localhost:${port}`;

void mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
mongoose.connection.on('error', (err) => {
  console.log('MongoDB connection error. Please make sure MongoDB is running.');
  throw err;
});

app.set('port', port);
app.set('trust proxy', true);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(compression());
app.use(helmet());
app.use(cookieParser());
app.use(passport.initialize());
app.use(morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev'));
app.use(fileUpload({
  limits: { fileSize: 5 * 1024 * 1024 },
}));

// Custom middlewares
app.use(message);
app.use(requiredParameters);

// Routes
app.use('/', index);

// 404 Handler
app.use((_req: Request, res: Response) => {
  res.error('Not Found', 404);
});

app.listen(port, async () => {
  const folder = await existsAsync(constants.uploadPath);
  if (!folder)
    await fs.mkdir(constants.uploadPath).catch(console.error);

  console.log('Listening at http://localhost:%d.', port);
});
