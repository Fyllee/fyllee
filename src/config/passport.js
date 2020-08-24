import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';
import User from '../models/user';

export default function configPassport() {
  passport.use(
    new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      try {
        // This one is typically a DB call. Assume that the returned user object
        // is pre-formatted and ready for storing in JWT
        console.log('password', password);
        // TODO: find only by email, and then check the password with a `verifyPassword`
        // method on the User model
        const user = await User.findOne({ email, password });
        if (!user)
          return done(null, false, { message: 'Incorrect email or password.' });
        return done(null, user, { message: 'Logged In Successfully' });
      } catch (err) {
        return done(err);
      }
    }),
  );

  passport.use(
    new JwtStrategy({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },

    async (jwtPayload, done) => {
      try {
        // Find the user in db if needed. This functionality may be
        // Omitted if you store everything you'll need in JWT payload.
        const user = await User.findOneById(jwtPayload.id);
        if (!user)
          return done(user);
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }),
  );
}
