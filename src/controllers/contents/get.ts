import { join } from 'path';
import type { NextFunction, Request, Response } from 'express';
import constants from '@/app/config/constants';
import messages from '@/app/config/messages';
import FilterManager from '@/app/helpers/FilterManager';
import isImage from '@/app/helpers/is-image';
import Content from '@/app/models/content';

/**
 * GET controller for the 'contents' route
 * @description Send back the given content
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {Function} next - The next callback
 */
export async function getContent(req: Request, res: Response, _next: NextFunction): Promise<void> {
  const { id } = req.params;

  const content = await Content.findOne({ savedName: id });
  if (!content)
    return res.error(...messages.errors.contentNotFound);

  if (!isImage(content.savedName))
    return res.sendFile(join(constants.uploadPaths.contents, content.application.applicationId, content.savedName));

  const filterManager = new FilterManager(req.query, content);
  const modifiedImage = await filterManager.run();

  res.set('Content-Type', filterManager.jimpImage.getMIME());
  res.send(modifiedImage);
}

/**
 * GET controller for the 'contents' route
 * @description Send back an array of all content the application has,
 * with data about them.
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {Function} next - The next callback
 */
export async function getAllContents(req: Request, res: Response, _next: NextFunction): Promise<void> {
  try {
    const appId = req.application._id;
    const contents = await Content.find({ application: appId });

    const saneContents = [];
    for (const content of contents)
      saneContents.push(content.toData());

    res.success(messages.success.gotContents, 200, { contents: saneContents });
  } catch (unknownError: unknown) {
    res.error(...messages.errors.serverError, unknownError as Error);
  }
}
