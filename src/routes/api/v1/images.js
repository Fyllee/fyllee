import { Router } from 'express';
import {
  getImage,
  getAllImages,
  createImage,
  deleteImage,
  deleteAllImages,
} from '../../../controllers/images';

const router = Router();

router.route('/:id')
  .get(getImage)
  .delete(deleteImage);

router.route('/')
  .get(getAllImages)
  .post(createImage)
  .delete(deleteAllImages);

export default router;
