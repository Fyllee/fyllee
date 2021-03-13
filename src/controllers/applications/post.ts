import { promises as fs } from 'fs';
import { extname, join } from 'path';
import type { NextFunction, Request, Response } from 'express';
import constants from '@/app/config/constants';
import messages from '@/app/config/messages';
import isImage from '@/app/helpers/is-image';
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
  if (!bodyContainsAllRequired)
    return res.error(...messages.errors.missingParameters);

  try {
    const app = await Application.findOne({ name: req.body.name });
    if (app)
      return res.error(...messages.errors.applicationAlreadyExists);

    const cover = Array.isArray(req.files?.cover) ? req.files?.cover[0] : req.files?.cover;
    if (!cover)
      return res.error(...messages.errors.noCoverProvided);
    if (!isImage(cover.name))
      return res.error(...messages.errors.coverMustBeImage);

    const newApp = await Application.create({
      owner: req.user._id,
      ...req.body,
    });

    await fs.mkdir(join(constants.uploadPaths.contents, newApp.applicationId));
    const coverName = join(constants.uploadPaths.applications, `${newApp.applicationId}${extname(cover.name)}`);
    cover.mv(coverName, (err?: Error) => {
      if (err)
        return res.error(...messages.errors.serverError);

      res.success(messages.success.addedApplication, 200, { application: newApp.toData() });
    });
  } catch (unknownError: unknown) {
    res.error(...messages.errors.serverError, unknownError as Error);
  }
}
