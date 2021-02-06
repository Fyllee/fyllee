import type { NextFunction, Request, Response } from 'express';
import removeApplicationFromDisk from '@/app/helpers/remove-application-from-disk';
import Application from '@/app/models/application';

/**
 * DELETE controller for the 'applications' route
 * @description Delete an application from disk and database and
 * all the images it contains
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {Function} next - The next callback
 */
export async function deleteApplication(req: Request, res: Response, _next: NextFunction): Promise<void> {
  const { id } = req.params;

  if (!id) {
    res.error('No id was provided', 400);
    return;
  }

  try {
    const application = await Application.findOne({ applicationId: id });
    if (!application) {
      res.error('Application not found', 404);
      return;
    }

    await removeApplicationFromDisk(application);
    await Application.deleteOne({ applicationId: id });

    res.success('Success!', 200);
  } catch (unknownError: unknown) {
    res.error('Something went wrong...', 500, unknownError as Error);
  }
}

/**
 * DELETE controller for the 'applications' route
 * @description Delete alls applications from disk and database and
 * all the images they contain
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {Function} next - The next callback
 */
export async function deleteAllApplications(req: Request, res: Response, _next: NextFunction): Promise<void> {
  try {
    const ownerId = req.user._id;
    const applications = await Application.find({ owner: ownerId });
    if (applications.length === 0) {
      res.success('Success!');
      return;
    }

    for (const application of applications)
      await removeApplicationFromDisk(application); // eslint-disable-line no-await-in-loop

    await Application.deleteMany({ owner: ownerId });

    res.success('Success!');
  } catch (unknownError: unknown) {
    res.error('Something went wrong...', 500, unknownError as Error);
  }
}
