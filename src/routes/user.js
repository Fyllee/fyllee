import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
  res.send('respond with a resource');
});

router.get('/profile', async (req, res) => {
  res.send(req.user);
});

export default router;
