import { Router } from 'express';
import {
  createApplication,
  deleteAllApplications,
  deleteApplication,
  getAllApplications,
  getApplication,
  updateApplication,
} from '@/app/controllers/applications';

const router = Router();

router.route('/:id')
  .get(getApplication)
  .patch(updateApplication)
  .delete(deleteApplication);

router.route('/')
  .get(getAllApplications)
  .post(createApplication)
  .delete(deleteAllApplications);

export default router;
