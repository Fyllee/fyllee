import { promises as fs } from 'fs';
import { join } from 'path';
import jwt from 'jsonwebtoken';

import constants from '../../config/constants';
import Application from '../../models/application';
import User from '../../models/user';

/**
 * POST controller for the 'application' route
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {Function} next - The request object
 */
export async function createApplication(req, res, _next) {
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

    await fs.mkdir(join(constants.uploadPath, newApp.id));

    const token = jwt.sign({ id: newApp.id }, process.env.JWT_SECRET);
    return res.json({ message: 'Application created.', application: newApp.toData(), token });
  } catch (err) {
    return res.error('Oops... Something went wrong.', 500, err);
  }
}
