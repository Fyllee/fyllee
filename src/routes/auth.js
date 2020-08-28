import { Router } from 'express';
import { login, verify, register } from '../controllers/auth';

const router = Router();

router.post('/login', login);
router.get('/login/verify', verify);
router.post('/register', register);

export default router;
