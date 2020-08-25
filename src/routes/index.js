import { Router } from 'express';
import passport from 'passport';
import apiv1 from './apiv1';
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
router.use('/api/v1/', passport.authenticate('jwt', { session: false }), apiv1);

export default router;
