import { Router } from 'express';
import passport from 'passport';
import v1 from './api/v1';
import applications from './applications';
import auth from './auth';
import user from './user';

const router = Router();

// GET /
router.get('/', (req, res) => {
  res.message("Welcome to Bild! There's nothing here...");
});

router.use('/user', passport.authenticate('jwt', { session: false }), user);
router.use('/auth', auth);
router.use('/applications', passport.authenticate('jwt', { session: false }), applications);
router.use('/api/v1', passport.authenticate('jwt', { session: false }), v1);

export default router;
