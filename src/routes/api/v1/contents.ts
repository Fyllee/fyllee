import { Router } from 'express';
import {
  createContent,
  deleteAllContents,
  deleteContent,
  getAllContents,
  getContent,
  getContentInformation,
  renameContent,
} from '@/app/controllers/contents';
import appToken from '@/app/middlewares/app-token';

const router = Router();

router.route('/:id')
  .get(getContent);

router.use(appToken)
  .route('/:id')
  .patch(renameContent)
  .delete(deleteContent);

router.use(appToken)
  .route('/:id/information')
  .get(getContentInformation);

router.use(appToken)
  .route('/')
  .get(getAllContents)
  .post(createContent)
  .delete(deleteAllContents);

export default router;
