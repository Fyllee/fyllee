import { join, extname } from 'path';
import { Router } from 'express';
import { nanoid } from 'nanoid';

const router = Router();

router.post('/upload', async (req, res, _next) => {
  if (!req.files || Object.keys(req.files).length === 0)
    return res.message('No file was provided', 400);

  const { image } = req.files;

  // /public/uploads/APP_ID/IMG_ID.ext
  const path = join(
    process.cwd(),
    'public',
    'uploads',
    '$app',
    `${nanoid(16)}.${extname(image.name)}`,
  );
  image.mv(path, (err) => {
    if (err)
      return res.message('Something went wrong...', 500);

    res.message('Success!');
  });
});

export default router;
