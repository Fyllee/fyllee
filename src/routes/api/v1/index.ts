import { Router } from 'express';
import passport from 'passport';

import applications from './applications';
import contents from './contents';

const router = Router();

router.use('/contents', contents);
router.use('/applications', passport.authenticate('jwt', { session: false }), applications);

export default router;
