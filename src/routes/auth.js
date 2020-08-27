import { Router } from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';

import User from '../models/user';

const router = Router();

router.post('/login', async (req, res, next) => {
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
});

router.post('/register', async (req, res, _next) => {
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
    console.error(err);
    return res.error('Oops... Something went wrong.', 500);
  }
});

export default router;
