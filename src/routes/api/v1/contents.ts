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

router.route('/')
  .get(appToken, getAllContents)
  .post(appToken, createContent)
  .delete(appToken, deleteAllContents);

router.route('/:id')
  .get(getContent)
  .patch(appToken, renameContent)
  .delete(appToken, deleteContent);

router.route('/:id/information')
  .get(appToken, getContentInformation);

export default router;
