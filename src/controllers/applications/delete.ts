import type { NextFunction, Request, Response } from 'express';
import messages from '@/app/config/messages';
import removeApplicationFromDisk from '@/app/helpers/remove-application-from-disk';
import Application from '@/app/models/application';

/**
 * DELETE controller for the 'applications' route
 * @description Delete an application from disk and database and
 * all the contents it contains
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {Function} next - The next callback
 */
export async function deleteApplication(req: Request, res: Response, _next: NextFunction): Promise<void> {
  const { id } = req.params;

  if (!id)
    return res.error(...messages.errors.noIdProvided);

  try {
    const application = await Application.findOne({ applicationId: id });
    if (!application)
      return res.error(...messages.errors.applicationNotFound);

    await removeApplicationFromDisk(application);
    await Application.deleteOne({ applicationId: id });

    res.success(messages.success.removedApplication);
  } catch (unknownError: unknown) {
    res.error(...messages.errors.serverError, unknownError as Error);
  }
}

/**
 * DELETE controller for the 'applications' route
 * @description Delete alls applications from disk and database and
 * all the contents they contain
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {Function} next - The next callback
 */
export async function deleteAllApplications(req: Request, res: Response, _next: NextFunction): Promise<void> {
  try {
    const ownerId = req.user._id;
    const applications = await Application.find({ owner: ownerId });
    if (applications.length === 0)
      return res.success(messages.success.removedApplications);

    for (const application of applications)
      await removeApplicationFromDisk(application); // eslint-disable-line no-await-in-loop

    await Application.deleteMany({ owner: ownerId });

    res.success(messages.success.removedApplications);
  } catch (unknownError: unknown) {
    res.error(...messages.errors.serverError, unknownError as Error);
  }
}
