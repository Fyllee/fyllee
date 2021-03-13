import { promises as fs } from 'fs';
import { extname, join } from 'path';
import type { NextFunction, Request, Response } from 'express';
import constants from '@/app/config/constants';
import messages from '@/app/config/messages';
import mime from '@/app/config/mime-type';
import Content from '@/app/models/content';
import type { ContentPopulatedDocument } from '@/app/types/models';

/**
 * GET controller for the 'contents/:id/information' route
 * @description Send back information about the given content
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {Function} next - The next callback
 */
export async function getContentInformation(req: Request, res: Response, _next: NextFunction): Promise<void> {
  const { id } = req.params;

  try {
    const content: ContentPopulatedDocument = await Content.findOne({ contentId: id });
    if (!content)
      return res.error(...messages.errors.contentNotFound);

    const contentPath = join(constants.uploadPaths.contents, content.application.applicationId, content.savedName);
    const mimeType = mime.contentType(extname(contentPath));
    const stats = await fs.stat(contentPath);

    res.success(messages.success.gotContentInformation, 200, {
      information: {
        mimeType,
        size: stats.size,
        creation: new Date(content.createdAt).getTime(),
        lastUpdate: new Date(content.updatedAt).getTime(),
        ...content.toData(),
      },
    });
  } catch (unknownError: unknown) {
    res.error(...messages.errors.serverError, unknownError as Error);
  }
}
