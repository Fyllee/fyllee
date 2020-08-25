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
      return res.status(400).json({
        message: 'Something is not right',
        user,
      });

    req.login(user, { session: false }, (err2) => {
      if (err2)
        res.send(err2);

      const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET);
      return res.json({ user, token });
    });
  })(req, res, next);
});

/* eslint-disable no-unused-vars */
router.post('/register', async (req, res, next) => {
  // Vérifier qu'il n'existe pas
  // const user = await User.find({ email: req.body.email });
  // Vérifier que tous les champs sont ok
  // L'ajouter à la bdd

  // Temporary test
  // new User({
  //   name: 'Emmanuel Macron',
  //   email: 'abc@defg.com',
  //   password: 'test',
  // }).save();

  res.json({ message: '/auth/register coming soon...' });
});

export default router;
