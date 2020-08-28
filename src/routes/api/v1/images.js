import { Router } from 'express';
import {
  getAllImages,
  getImage,
  createImage,
  deleteImage,
} from '../../../controllers/images';

const router = Router();

router.get('/:id', getImage);
router.route('/')
  .get(getAllImages)
  .post(createImage)
  .delete(deleteImage);

export default router;
