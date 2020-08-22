import { Router } from 'express';
import loadRoutes from '../helpers/loadRoutes';

const router = Router();
const routes = loadRoutes(__dirname);

// GET /
router.get('/', (req, res) => {
  res.status(200).json({ title: '' });
});

routes.then(r => router.use(r));

export default router;
