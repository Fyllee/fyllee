import type { NextFunction, Request, Response } from 'express';
import messages from '@/app/config/messages';
import Application from '@/app/models/application';

interface Actions {
  name: string | null;
  website: string | null;
  description: string | null;
  token: string | true | null;
}

/**
 * PATCH controller for the 'applications' route
 * @description Update an application's informations, such as its website,
 * its description or its name.
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {Function} next - The next callback
 */
export async function updateApplication(req: Request, res: Response, _next: NextFunction): Promise<void> {
  const { id } = req.params;

  if (!id)
    return res.error(...messages.errors.noIdProvided);

  const actions: Actions = {
    name: req.body.name || null,
    website: req.body.website || null,
    description: req.body.description || null,
    token: req.body.resetToken === true || null,
  };
  if (Object.values(actions).every(action => action === null))
    return res.error(...messages.errors.missingParameters);

  try {
    const application = await Application.findOne({ applicationId: id });
    if (!application)
      return res.error(...messages.errors.applicationNotFound);

    if (actions.token)
      actions.token = application.generateToken();

    // Remove all falsy values from the object, to directly pass it to the database query.
    const update = Object.fromEntries(Object.entries(actions).filter(([_k, v]) => v !== null));
    await Application.findByIdAndUpdate(application._id, update);

    res.success(messages.success.updatedApplication, 200, { application: update });
  } catch (unknownError: unknown) {
    res.error(...messages.errors.serverError, unknownError as Error);
  }
}
