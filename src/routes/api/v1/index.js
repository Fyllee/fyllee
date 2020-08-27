import { Router } from 'express';
import passport from 'passport';
import appToken from '../../../middlewares/app-token';

import applications from './applications';
import images from './images';

const router = Router();

router.use('/images', appToken, images);
router.use('/applications', passport.authenticate('jwt', { session: false }), applications);

export default router;
