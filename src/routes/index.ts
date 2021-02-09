import { Router } from 'express';
import type { Request, Response } from 'express';
import passport from 'passport';
import { getImage } from '@/app/controllers/images';
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
router.use('/user', passport.authenticate('jwt', { session: false }), user);

// Alias to /api/v1/image/:id
router.get('/content/:id', getImage);

export default router;
