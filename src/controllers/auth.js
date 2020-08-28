import jwt from 'jsonwebtoken';
import passport from 'passport';
import transporter from '../config/transporter';
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
      if (err2)
        return res.error('Something went wrong.', 400, err2);

      const token = jwt.sign(user.toJWT(), process.env.JWT_SECRET);
      return res.json({ message: 'You are now logged in.', user: user.toData(), token });
    });
  })(req, res, next);
}

/**
 * GET controller for the '/auth/login/verify' route
 * @description Verify the user's email
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {Function} next - The next callback
 */
export async function verify(req, res, _next) {
  const { key } = req.query;
  const { _id } = req.user;

  try {
    const user = await User.findById(_id);
    if (!user.verified) {
      if (user.verifyKey === key) {
        await User.updateOne({ _id }, { verified: true });
      } else {
        return res.error('Invalid key', 400);
      }
    } else {
      return res.error('Already verified', 400);
    }
  } catch (error) {
    res.error('Something went wrong...', 500, error);
  }
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

    const info = await transporter.sendMail({
      to: newUser.email,
      subject: 'Bild : Account creation verification',
      html: `
        <p>
          Hi ${newUser.name},
          <br>Thank you for creating a Bild account! To finalize this procedure,
          <br>clic <a href="http://localhost:5050/auth/login/verify?key=${newUser.verifyKey}">here</a> ).
        </p>
        <p>
          Hoping to see you soon,
          <br>The Bild Team
        </p>`,
    });

    if (!info || info.rejected.includes(newUser.email))
      return res.error('Unable to send the email', 400);

    return res.json({ user: newUser.toData() });
  } catch (err) {
    return res.error('Oops... Something went wrong.', 500, err);
  }
}
