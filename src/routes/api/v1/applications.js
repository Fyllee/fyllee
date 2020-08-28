import { Router } from 'express';
import {
  getApplication,
  getAllApplications,
  createApplication,
  deleteApplication,
  deleteAllApplications,
} from '../../../controllers/applications';

const router = Router();

router.route('/:id')
  .get(getApplication)
  .delete(deleteApplication);

router.route('/')
  .get(getAllApplications)
  .post(createApplication)
  .delete(deleteAllApplications);

export default router;
