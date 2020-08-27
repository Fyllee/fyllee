import { Router } from 'express';
import jwt from 'jsonwebtoken';
import Application from '../models/application';
import User from '../models/user';

const router = Router();

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

    const token = jwt.sign({ id: newApp.id }, process.env.JWT_SECRET);
    return res.json({ message: 'Application created.', application: newApp.toData(), token });
  } catch (err) {
    console.error(err);
    return res.error('Oops... Something went wrong.', 500);
  }
});

export default router;
