import type { NextFunction, Request, Response } from 'express';
import messages from '@/app/config/messages';
import removeContentFromDisk from '@/app/helpers/remove-content-from-disk';
import Content from '@/app/models/content';

/**
 * DELETE controller for the 'contents' route
 * @description Delete a content from disk and database
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {Function} next - The next callback
 */
export async function deleteContent(req: Request, res: Response, _next: NextFunction): Promise<void> {
  const { id } = req.params;

  if (!id)
    return res.error(...messages.errors.noIdProvided);

  try {
    const content = await Content.findOne({ contentId: id });
    if (!content)
      return res.error(...messages.errors.contentNotFound);

    await removeContentFromDisk(content);
    await Content.deleteOne({ contentId: id });

    res.success(messages.success.removedContent);
  } catch (unknownError: unknown) {
    res.error(...messages.errors.serverError, unknownError as Error);
  }
}

/**
 * DELETE controller for the 'contents' route
 * @description Delete all contents of an application from
 * disk and database
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {Function} next - The next callback
 */
export async function deleteAllContents(req: Request, res: Response, _next: NextFunction): Promise<void> {
  try {
    const appId = req.application._id;
    const contents = await Content.find({ application: appId });
    if (contents.length === 0)
      return res.success(messages.success.removedContents);

    for (const content of contents)
      await removeContentFromDisk(content); // eslint-disable-line no-await-in-loop

    await Content.deleteMany({ application: appId });

    res.success(messages.success.removedContents);
  } catch (unknownError: unknown) {
    res.error(...messages.errors.serverError, unknownError as Error);
  }
}
