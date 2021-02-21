import { extname, join } from 'path';
import type { NextFunction, Request, Response } from 'express';
import { nanoid } from 'nanoid';

import constants from '@/app/config/constants';
import messages from '@/app/config/messages';
import mime from '@/app/config/mime-type';
import Application from '@/app/models/application';
import Content from '@/app/models/content';

/**
 * POST controller for the 'contents' route
 * @description Create a new content
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {Function} next - The next callback
 */
export async function createContent(req: Request, res: Response, _next: NextFunction): Promise<void> {
  if (!req.files || Object.keys(req.files).length === 0)
    return res.error(...messages.errors.noFileProvided);

  const content = Array.isArray(req.files.content) ? req.files.content[0] : req.files.content;

  if (!content)
    return res.error(...messages.errors.noFileProvided);

  const extension = extname(content.name).replace('.', '');

  if (!mime.lookup(extension))
    return res.error(...messages.errors.forbiddenFileType);

  try {
    const application = await Application.findById(req.application._id);

    // /public/uploads/APP_ID/CONTENT_ID.ext
    const contentId = nanoid(10);
    const savedName = `${contentId}.${extension}`;
    const path = join(constants.uploadPath, application.applicationId, savedName);

    content.mv(path, async (err?: Error) => {
      if (err)
        return res.error(...messages.errors.serverError);

      try {
        const newContent = await Content.create({
          application: application._id,
          originalName: content.name,
          savedName,
          contentId,
        });

        res.success(messages.success.addedContent, 200, { content: newContent.toData() });
      } catch (unknownError: unknown) {
        res.error(...messages.errors.serverError, unknownError as Error);
      }
    });
  } catch (unknownError: unknown) {
    res.error(...messages.errors.serverError, unknownError as Error);
  }
}
