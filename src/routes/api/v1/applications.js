import { Router } from 'express';
import { getApplication, createApplication, deleteApplication } from '../../../controllers/applications';

const router = Router();

router.route('/')
  .get(getApplication)
  .post(createApplication)
  .delete(deleteApplication);

export default router;
