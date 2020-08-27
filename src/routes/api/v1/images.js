import { Router } from 'express';
import { getImage, createImage, deleteImage } from '../../../controllers/images';

const router = Router();

router.route('/')
  .get(getImage)
  .post(createImage)
  .delete(deleteImage);

export default router;
