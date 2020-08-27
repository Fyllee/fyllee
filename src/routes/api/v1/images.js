import { promises as fs } from 'fs';
import { join, extname } from 'path';
import { Router } from 'express';
import { nanoid } from 'nanoid';

import Application from '../../../models/application';
import Image from '../../../models/image';

const router = Router();
const uploadPath = join(process.cwd(), 'uploads');

router.get('/', async (req, res, _next) => {
  const { id } = req.body;

  const image = await Image.findOne({ id }).populate('application');
  if (!image)
    return res.error('Image not found', 404);

  res.sendFile(join(uploadPath, image.application.id, image.savedName));
});

router.post('/', async (req, res, _next) => {
  if (!req.files || Object.keys(req.files).length === 0)
    return res.error('No file was provided', 400);

  const { image } = req.files;
  const appId = req.application.id;

  // /public/uploads/APP_ID/IMG_ID.ext
  const imageId = nanoid(10);
  const savedName = `${imageId}${extname(image.name)}`;
  const path = join(uploadPath, appId, savedName);

  image.mv(path, async (err) => {
    if (err)
      return res.success('Something went wrong...', 500);

    try {
      const application = await Application.findOne({ id: appId });
      const newImage = await Image.create({
        application: application._id,
        originalName: image.name,
        savedName,
        id: imageId,
      });

      res.success('Success!', 200, { image: newImage.toData() });
    } catch (error) {
      console.error(error);
      return res.error('Oops... Something went wrong.', 500);
    }
  });
});

router.delete('/', async (req, res, _next) => {
  const { id } = req.body;

  if (!id)
    return res.error('No id was provided', 400);

  try {
    const image = await Image.findOne({ id }).populate('application');
    if (!image)
      return res.error('Image not found', 404);

    const filePath = join(uploadPath, image.application.id, image.savedName);
    const file = await fs.stat(filePath);

    // Delete from storage and database
    if (file)
      await fs.unlink(filePath);
    await Image.deleteOne({ id });

    res.success('Success!', 200);
  } catch (err) {
    console.error(err);
    return res.error('Something went wrong...', 500);
  }
});

export default router;
