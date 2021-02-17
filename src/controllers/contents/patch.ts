import type { NextFunction, Request, Response } from 'express';
import messages from '@/app/config/messages';
import Content from '@/app/models/content';

/**
 * PATCH controller for the 'contents' route
 * @description Rename an content
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {Function} next - The next callback
 */
export async function renameContent(req: Request, res: Response, _next: NextFunction): Promise<void> {
  const { id } = req.params;

  if (!id)
    return res.error(...messages.errors.noIdProvided);

  if (typeof req.body.renameTo !== 'string')
    return res.error(...messages.errors.missingParameters);

  try {
    const content = await Content.findOne({ contentId: id });
    if (!content)
      return res.error(...messages.errors.contentNotFound);

    await Content.findByIdAndUpdate(content._id, { originalName: req.body.renameTo });

    res.success(messages.success.renamedContent);
  } catch (unknownError: unknown) {
    res.error(...messages.errors.serverError, unknownError as Error);
  }
}
