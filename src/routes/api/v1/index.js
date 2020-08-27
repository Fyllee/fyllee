import { promises as fs } from 'fs';
import { join, extname } from 'path';
import { Router } from 'express';
import { nanoid } from 'nanoid';

import appToken from '../../../middlewares/app-token';
import Application from '../../../models/application';
import Image from '../../../models/image';

const router = Router();
const uploadPath = join(process.cwd(), 'public', 'uploads');

router.use(appToken);

router.get('/', async (req, res, _next) => {
  res.send("There's nothing here... but application token is valid!");
});

router.post('/image', async (req, res, _next) => {
  if (!req.files || Object.keys(req.files).length === 0)
    return res.error('No file was provided', 400);

  const { image } = req.files;
  const appId = req.application.id;

  // /public/uploads/APP_ID/IMG_ID.ext
  const path = join(uploadPath, appId, `${nanoid(16)}${extname(image.name)}`);

  image.mv(path, async (err) => {
    if (err)
      return res.success('Something went wrong...', 500);

    try {
      const application = await Application.findOne({ id: appId });
      const newImage = await Image.create({
        application: application._id,
        name: image.name,
      });

      res.success('Success!', 200, { image: newImage.toData() });
    } catch (error) {
      console.error(error);
      return res.error('Oops... Something went wrong.', 500);
    }
  });
});

router.delete('/image/:id', async (req, res, _next) => {
  const { id } = req.params;

  if (!id)
    return res.error('No id was provided', 400);

  try {
    const image = await Image.findOne({ id }).populate('application');
    const filePath = join(uploadPath, image.application.id, image.name);
    const file = await fs.stat(filePath);
    if (!file)
      return res.error('Image not found', 404);

    await fs.unlink(filePath);
    res.success('Success!', 200);
  } catch (err) {
    console.error(err);
    return res.error('Something went wrong...', 500);
  }
});

export default router;
