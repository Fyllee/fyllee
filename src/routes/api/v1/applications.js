import { Router } from 'express';
import {
  getAllApplications,
  getApplication,
  createApplication,
  deleteApplication,
} from '../../../controllers/applications';

const router = Router();

router.get('/:id', getApplication);
router.route('/')
  .get(getAllApplications)
  .post(createApplication)
  .delete(deleteApplication);

export default router;
