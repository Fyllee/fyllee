import { Router } from 'express';
import type { Request, Response } from 'express';
import { getContent } from '@/app/controllers/contents';
import authentication from '../controllers/Authentication';
import v1 from './api/v1';
import auth from './auth';
import user from './user';

const router = Router();

// GET /
router.get('/', (_req: Request, res: Response): void => {
  res.success("Welcome to Bild! There's nothing here...", 200);
});

router.use('/auth', auth);
router.use('/api/v1', v1);
router.use('/user', authentication.authenticate('user'), user);

// Alias to /api/v1/contents/:id
router.get('/contents/:id', getContent);

export default router;
