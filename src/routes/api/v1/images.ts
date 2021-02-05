import { Router } from 'express';
import {
  createImage,
  deleteAllImages,
  deleteImage,
  getAllImages,
  getImage,
} from '@/app/controllers/images';
import appToken from '@/app/middlewares/app-token';

const router = Router();

router.route('/:id')
  .get(getImage)
  .delete(appToken, deleteImage);

router.use(appToken)
  .route('/')
  .get(getAllImages)
  .post(createImage)
  .delete(deleteAllImages);

export default router;
