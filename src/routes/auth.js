import { Router } from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';

const router = Router();

router.post('/login', async (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, _info) => {
    if (err)
      return next(err);

    if (!user)
      return res.status(400).json({
        message: 'Something is not right',
        user,
      });

    req.login(user, { session: false }, (err2) => {
      if (err2) res.send(err2);

      // Generate a signed json web token with the contents of user object and return it in the response
      const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET);
      return res.json({ user, token });
    });
  })(req, res, next);
});

export default router;
