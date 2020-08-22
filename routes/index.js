import { Router } from 'express';
import loadRoutes from '../helpers/loadRoutes';

const router = Router();
const routes = loadRoutes(__dirname);

// GET /
router.get('/', (req, res) => {
  res.status(200).json({ title: '' });
});

router.use(routes);

export default router;
