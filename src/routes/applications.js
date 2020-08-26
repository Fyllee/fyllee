import { Router } from 'express';
import Application from '../models/application';

const router = Router();

router.post('/', async (req, res, _next) => {
  const bodyContainsAllRequired = req.requiredParameters(Application, 'owner');
  if (!bodyContainsAllRequired)
    return res.message('Missing body parameters', 400);

  try {
    const app = await Application.findOne({ name: req.body.name });
    if (app)
      return res.message("Application's name is already used", 409);

    const newApp = await Application.create({
      owner: req.user.id,
      ...req.body,
    });

    return res.json({ application: newApp.toData() });
  } catch (err) {
    console.error(err);
    return res.message('Oops... Something went wrong.', 500);
  }
});

export default router;
