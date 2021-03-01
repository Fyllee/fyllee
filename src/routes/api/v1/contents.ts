import { Router } from 'express';
import passport from 'passport';
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

const auth = passport.authenticate('application', { session: false });

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
