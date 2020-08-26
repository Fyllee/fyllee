import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
  res.message("There's nothing here... but you're authenticate!");
});

router.get('/profile', async (req, res) => {
  console.log('req.user', req.user);
  console.log('req.application', req.application);

  res.json(req.user);
});

export default router;
