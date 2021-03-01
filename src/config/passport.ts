import type { Request } from 'express';
import passport from 'passport';
import type { VerifiedCallback } from 'passport-custom';
import { Strategy as CustomStrategy } from 'passport-custom';
import { Strategy as LocalStrategy } from 'passport-local';
import extractBearerToken from '@/app/helpers/extract-bearer-token';
import Application from '@/app/models/application';
import User from '@/app/models/user';
import messages from './messages';

export default function configPassport(): void {
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

  passport.use(
    'user',
    new CustomStrategy(
      async (req: Request, done: VerifiedCallback) => {
        const token = extractBearerToken(req.headers.authorization);
        if (!token)
          return done('Invalid User Authentication Header');

        const user = await User.findOne({ token });
        if (!user)
          return done(user);

        done(null, user);
      },
    ),
  );

  passport.use(
    'application',
    new CustomStrategy(
      async (req: Request, done: VerifiedCallback) => {
        const token = extractBearerToken(req.headers.authorization);
        if (!token)
          return done('Invalid Application Authentication Header');

        const app = await Application.findOne({ token });
        if (!app)
          return done(app);

        req.application = app;
        done(null, app);
      },
    ),
  );
}
