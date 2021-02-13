import passport from 'passport';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';
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

  // User JWT
  passport.use(
    new JwtStrategy({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },

    async (jwtPayload, done) => {
      try {
        const user = await User.findById(jwtPayload._id);
        if (!user)
          return done(user);

        done(null, user.toJWT());
      } catch (unknownError: unknown) {
        done(unknownError as Error);
      }
    }),
  );
}
