import type { NextFunction, Request, Response } from 'express';
import Application from '@/app/models/application';

/**
 * GET controller for the 'application' route
 * @description Send back the application data
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {Function} next - The next callback
 */
export async function getApplication(req: Request, res: Response, _next: NextFunction): Promise<void> {
  const { id } = req.params;

  const application = await Application.findOne({ applicationId: id });
  if (!application) {
    res.error('Application not found', 404);
    return;
  }

  res.json({ application: application.toData() });
}

/**
 * GET controller for the 'application' route
 * @description Send back an array of all applications the user has,
 * with data about them.
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {Function} next - The next callback
 */
export async function getAllApplications(req: Request, res: Response, _next: NextFunction): Promise<void> {
  const ownerId = req.user._id;
  const applications = await Application.find({ owner: ownerId });

  const saneApplications = [];
  for (const application of applications)
    saneApplications.push(application.toData());

  res.json({ applications: saneApplications });
}
