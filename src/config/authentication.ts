import type { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import authentication from '@/app/controllers/Authentication';
import Application from '@/app/models/application';
import User from '@/app/models/user';
import extractBearerToken from '../helpers/extract-bearer-token';
import messages from './messages';

passport.use(
  new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
  },

  async (email, password, done) => {
    try {
      const user = await User.findOne({ email });

      if (!user)
        return done(null, false, { message: messages.flash.invalidEmail });

      const validate = await user.isValidPassword(password);
      if (!validate)
        return done(null, false, { message: messages.flash.invalidPassword });

      done(null, user, { message: messages.flash.loggedIn });
    } catch (unknownError: unknown) {
      done(unknownError as Error);
    }
  }),
);

authentication.use(
  'user',
  async (req: Request, res: Response, next: NextFunction) => {
    const token = extractBearerToken(req.headers.authorization);
    if (!token)
      return res.error(...messages.errors.noTokenProvided);

    const user = await User.findOne({ token });
    if (!user)
      return res.error(...messages.errors.userNotFound);

    req.user = user;
    next();
  },
);

authentication.use(
  'application',
  async (req: Request, res: Response, next: NextFunction) => {
    const token = extractBearerToken(req.headers.authorization);
    if (!token)
      return res.error(...messages.errors.noTokenProvided);

    const app = await Application.findOne({ token });
    if (!app)
      return res.error(...messages.errors.applicationNotFound);

    req.application = app;
    next();
  },
);
