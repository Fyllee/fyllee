import { Router } from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';

const router = Router();

router.post('/login', async (req, res, next) => {
  console.log('body', req.body);
  passport.authenticate('local', { session: false }, (err, user, _info) => {
    console.log('authenticated called');
    if (err)
      return next(err);

    if (!user)
      return res.status(400).json({
        message: 'Something is not right',
        user,
      });

    console.log('authenticated success');

    req.login(user, { session: false }, (err2) => {
      if (err2) res.send(err2);

      // Generate a signed json web token with the contents of user object and return it in the response
      const token = jwt.sign(user, process.env.JWT_SECRET);
      return res.json({ user, token });
    })(req, res);
  });
});

export default router;
