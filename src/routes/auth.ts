import dotenv from 'dotenv';
import { Router } from 'express';
import { login, register } from '../controllers/auth';

dotenv.config();
const router = Router();

router.post('/login', login);
if (JSON.parse(process.env.AUTH_REGISTRATION) !== false)
  router.post('/register', register);

export default router;
