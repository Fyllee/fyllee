import { Router } from 'express';
import Application from '../models/application';

const router = Router();

router.post('/', async (req, res, _next) => {
  const bodyContainsAllRequired = req.requiredParameters(Application);
  if (!bodyContainsAllRequired)
    return res.status(400).json({ message: 'Missing body parameters' });

  try {
    const app = await Application.findOne({ name: req.body.name });
    if (app)
      res.status(409).json({ message: "Application's name is already used" });

    const newApp = await Application.create(req.body);

    return res.json({ user: newApp.getAppData() });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Oops... Something went wrong.' });
  }
});

export default router;
