import { promises as fs } from 'fs';
import { join } from 'path';
import { Router } from 'express';
import jwt from 'jsonwebtoken';
import Application from '../../../models/application';
import User from '../../../models/user';

const router = Router();
const uploadPath = join(process.cwd(), 'public', 'uploads');

router.post('/', async (req, res, _next) => {
  const bodyContainsAllRequired = req.requiredParameters(Application, 'owner');
  if (!bodyContainsAllRequired)
    return res.error('Missing body parameters', 400);

  try {
    const app = await Application.findOne({ name: req.body.name });
    if (app)
      return res.error("Application's name is already used", 409);

    const owner = await User.findOne({ id: req.user.id });
    const newApp = await Application.create({
      owner: owner._id,
      ...req.body,
    });

    await fs.mkdir(join(uploadPath, newApp.id));

    const token = jwt.sign({ id: newApp.id }, process.env.JWT_SECRET);
    return res.json({ message: 'Application created.', application: newApp.toData(), token });
  } catch (err) {
    console.error(err);
    return res.error('Oops... Something went wrong.', 500);
  }
});

router.delete('/', async (req, res, _next) => {
  const { id } = req.body;

  if (!id)
    return res.error('No id was provided', 400);

  try {
    const application = await Application.findOne({ id });
    if (!application)
      return res.error('Application not found', 404);

    const folderPath = join(uploadPath, application.id);
    const folder = await fs.stat(folderPath);

    // Delete from storage and database
    if (folder)
      await fs.rmdir(folderPath);
    await Application.deleteOne({ id });

    // TODO: also delete all images inside this app, from database and disk

    res.success('Success!', 200);
  } catch (err) {
    console.error(err);
    return res.error('Something went wrong...', 500);
  }
});

export default router;
