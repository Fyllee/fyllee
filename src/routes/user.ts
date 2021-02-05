import { Router } from 'express';
import type { Request, Response } from 'express';
import User from '@/app/models/user';

const router = Router();

router.get('/', async (req: Request, res: Response): Promise<void> => {
  const user = await User.findById(req.user._id);
  res.json(user.toData());
});

export default router;
