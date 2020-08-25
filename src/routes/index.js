import { Router } from 'express';
import passport from 'passport';
import auth from './auth';
import user from './user';

const router = Router();

// GET /
router.get('/', (req, res) => {
  res.status(200).json({ title: '' });
});

router.use('/user', passport.authenticate('jwt', { session: false }), user);
router.use('/auth', auth);

export default router;
