import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
  res.success("There's nothing here... but you're authenticate!", 200);
});

router.get('/profile', async (req, res) => {
  res.json(req.user);
});

export default router;
