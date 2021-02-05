import { promises as fs } from 'fs';
import { join } from 'path';
import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import constants from '@/app/config/constants';
import Application from '@/app/models/application';

/**
 * POST controller for the 'application' route
 * @description Create a new application
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {Function} next - The request object
 */
export async function createApplication(req: Request, res: Response, _next: NextFunction): Promise<void> {
  const bodyContainsAllRequired = req.requiredParameters(Application, 'owner');
  if (!bodyContainsAllRequired) {
    res.error('Missing body parameters', 400);
    return;
  }

  try {
    const app = await Application.findOne({ name: req.body.name });
    if (app) {
      res.error("Application's name is already used", 409);
      return;
    }

    const newApp = await Application.create({
      owner: req.user._id,
      ...req.body,
    });

    await fs.mkdir(join(constants.uploadPath, newApp.id));

    const token = jwt.sign(newApp.toJWT(), process.env.JWT_SECRET);
    res.json({ message: 'Application created.', application: newApp.toData(), token });
  } catch (unknownError: unknown) {
    res.error('Oops... Something went wrong.', 500, unknownError as Error);
  }
}
