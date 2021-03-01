import { Router } from 'express';
import authentication from '@/app/controllers/Authentication';

import applications from './applications';
import contents from './contents';

const router = Router();

router.use('/contents', contents);
router.use('/applications', authentication.authenticate('user'), applications);

export default router;
