import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
  res.message("There's nothing here... but you're authenticate!");
});

router.get('/profile', async (req, res) => {
  res.json(req.user);
});

export default router;
