import { promises as fs } from 'fs';
import { join, extname } from 'path';
import { Router } from 'express';
import { nanoid } from 'nanoid';
import passport from 'passport';

import structuredClone from '../../../helpers/structuredClone';
import Application from '../../../models/application';
import Image from '../../../models/image';

const router = Router();

const uploadPath = join(process.cwd(), 'public', 'uploads');

router.use(async (req, res, next) => {
  passport.authenticate('jwtApp', { session: false }, (err, app, _info) => {
    if (err)
      return next(err);

    if (!app)
      return res.status(400).json({ message: 'Something is not right' });

    // FIXME: doesn't work req.user is already the app.
    const user = structuredClone(req.user);

    req.login(app, { session: false }, (err2) => {
      if (err2)
        return res.send(err2);

      req.application = app;
      req.user = user;

      return next();
    });
  })(req, res, next);
});

router.post('/image', async (req, res, _next) => {
  if (!req.files || Object.keys(req.files).length === 0)
    return res.message('No file was provided', 400);

  console.log('req.user', req.user);
  console.log('req.application', req.application);

  const { image } = req.files;
  const appId = 'id'; // TODO: Find the app ID with the JWT

  // /public/uploads/APP_ID/IMG_ID.ext
  const path = join(uploadPath, appId, `${nanoid(16)}.${extname(image.name)}`);

  image.mv(path, async (err) => {
    if (err)
      return res.message('Something went wrong...', 500);

    try {
      const application = await Application.findOne({ id: appId });
      const newImage = await Image.create({
        application: application._id,
        name: image.name,
      });
      res.message('Success!', { image: newImage.toData() });
    } catch (error) {
      console.error(error);
      return res.message('Oops... Something went wrong.', 500);
    }
  });
});

router.delete('/image/:id', async (req, res, _next) => {
  const { id } = req.params;

  if (!id)
    return res.message('No id was provided', 400);

  try {
    const image = await Image.findOne({ id }).populate('application');
    const filePath = join(uploadPath, image.application.id, image.name);
    const file = await fs.stat(filePath);
    if (!file)
      return res.message('Image not found', 404);

    await fs.unlink(filePath);
    res.message('Success!');
  } catch (err) {
    console.error(err);
    return res.message('Something went wrong...', 500);
  }
});

export default router;
