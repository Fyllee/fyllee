import { Router } from 'express';
import User from '../models/user';

const router = Router();

router.get('/', async (req, res) => {
  const user = await User.findById(req.user._id);
  return res.json(user.toData());
});

export default router;
