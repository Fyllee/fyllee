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
      return res.status(400).json({ message: 'Something is not right' });

    req.login(user, { session: false }, (err2) => {
      if (err2)
        res.send(err2);

      const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET);
      return res.json({ user: user.toUserData(), token });
    });
  })(req, res, next);
});

router.post('/register', async (req, res, _next) => {
  const bodyContainsAllRequired = req.requiredParameters(User);

  if (!bodyContainsAllRequired)
    return res.status(400).json({ message: 'Missing body parameters' });

  try {
    const user = await User.findOne({ email: req.body.email });
    if (user)
      return res.status(409).json({ message: 'User already exists' });

    const newUser = await User.create(req.body);

    return res.json({ user: newUser.getUserData() });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Oops... Something went wrong.' });
  }
});

export default router;
