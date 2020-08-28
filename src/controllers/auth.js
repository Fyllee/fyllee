import jwt from 'jsonwebtoken';
import passport from 'passport';
import User from '../models/user';


/**
 * POST controller for the '/auth/login' route
 * @description Login the user, for him to have his user Token
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {Function} next - The next callback
 */
export async function login(req, res, next) {
  passport.authenticate('local', { session: false }, (err, user, _info) => {
    if (err)
      return next(err);

    if (!user)
      return res.error('Something went wrong.', 400);

    req.login(user, { session: false }, (err2) => {
      if (err2) {
        console.log(err2);
        return res.error('Something went wrong.', 400);
      }

      const token = jwt.sign({ email: user.toJSON().email }, process.env.JWT_SECRET);
      return res.json({ message: 'You are now logged in.', user: user.toData(), token });
    });
  })(req, res, next);
}


/**
 * POST controller for the '/auth/register' route
 * @description Create a new user
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {Function} next - The next callback
 */
export async function register(req, res, _next) {
  const bodyContainsAllRequired = req.requiredParameters(User);

  if (!bodyContainsAllRequired)
    return res.error('Missing body parameters.', 400);

  try {
    const user = await User.findOne({ email: req.body.email });
    if (user)
      return res.error('User already exists.', 409);

    const newUser = await User.create(req.body);

    return res.json({ user: newUser.toData() });
  } catch (err) {
    return res.error('Oops... Something went wrong.', 500, err);
  }
}
