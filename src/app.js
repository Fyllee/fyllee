import bodyParser from 'body-parser';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import mongoose from 'mongoose';
import morgan from 'morgan';
import passport from 'passport';

import configPassport from './config/passport';
import index from './routes';

dotenv.config();
configPassport();

const app = express();

export const port = Number(process.env.PORT) || 5050;
export const baseUrl = `http://localhost:${port}`;

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useCreateIndex', true);
mongoose.connect(process.env.MONGO_URI);
mongoose.connection.on('error', (err) => {
  console.log('MongoDB connection error. Please make sure MongoDB is running.');
  throw err;
});

app.set('port', port);
app.set('trust proxy', 1);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(compression());
app.use(helmet());
app.use(cookieParser());
app.use(passport.initialize());
app.use(morgan('dev'));

// Routes
app.use('/', index);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ code: 404, message: 'Not Found' });
});

app.listen(port, () => {
  console.log('Listening at http://localhost:%d.', port);
});
