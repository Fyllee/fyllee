import { Router } from 'express';
import {
  createImage,
  deleteAllImages,
  deleteImage,
  getAllImages,
  getImage,
  getImageInformation,
  renameImage,
} from '@/app/controllers/images';
import appToken from '@/app/middlewares/app-token';

const router = Router();

router.route('/:id')
  .get(getImage);

router.use(appToken)
  .route('/:id')
  .patch(renameImage)
  .delete(deleteImage);

router.use(appToken)
  .route('/:id/information')
  .get(getImageInformation);

router.use(appToken)
  .route('/')
  .get(getAllImages)
  .post(createImage)
  .delete(deleteAllImages);

export default router;
