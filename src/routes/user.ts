import { Router } from 'express';
import type { Request, Response } from 'express';
import User from '@/app/models/user';
import messages from '../config/messages';

const router = Router();

router.get('/', async (req: Request, res: Response): Promise<void> => {
  const user = await User.findById(req.user._id);

  res.success(messages.success.gotUser, 200, { user: user.toData() });
});

export default router;
