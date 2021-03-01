import { Router } from 'express';
import authentication from '@/app/controllers/Authentication';
import {
  createContent,
  deleteAllContents,
  deleteContent,
  getAllContents,
  getContent,
  getContentInformation,
  renameContent,
} from '@/app/controllers/contents';

const router = Router();

const auth = authentication.authenticate('application');

router.route('/')
  .get(auth, getAllContents)
  .post(auth, createContent)
  .delete(auth, deleteAllContents);

router.route('/:id')
  .get(getContent)
  .patch(auth, renameContent)
  .delete(auth, deleteContent);

router.route('/:id/information')
  .get(auth, getContentInformation);

export default router;
