import passport from 'passport';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';
import User from '../models/user';

export default function configPassport(): void {
  passport.use(
    new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password',
    },

    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });

        if (!user) {
          done(null, false, { message: 'Incorrect email' });
          return;
        }

        const validate = await user.isValidPassword(password);
        if (!validate) {
          done(null, false, { message: 'Incorrect password' });
          return;
        }

        done(null, user, { message: 'Logged In Successfully' });
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
        if (!user) {
          done(user);
          return;
        }

        done(null, user.toJWT());
      } catch (unknownError: unknown) {
        done(unknownError as Error);
      }
    }),
  );
}
