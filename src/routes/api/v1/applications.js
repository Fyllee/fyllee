import { Router } from 'express';
import {
  createApplication,
  deleteAllApplications,
  deleteApplication,
  getAllApplications,
  getApplication,
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
