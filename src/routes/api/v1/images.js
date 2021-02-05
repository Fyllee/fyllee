import { Router } from 'express';
import {
  createImage,
  deleteAllImages,
  deleteImage,
  getAllImages,
  getImage,
} from '../../../controllers/images';
import appToken from '../../../middlewares/app-token';

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
