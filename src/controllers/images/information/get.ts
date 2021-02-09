import { promises as fs } from 'fs';
import path from 'path';
import type { NextFunction, Request, Response } from 'express';
import mime from 'mime-types';
import constants from '@/app/config/constants';
import messages from '@/app/config/messages';
import Image from '@/app/models/image';
import type { ImagePopulatedDocument } from '@/app/types/models';

/**
 * GET controller for the 'images/:id/information' route
 * @description Send back information about the given image
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {Function} next - The next callback
 */
export async function getImageInformation(req: Request, res: Response, _next: NextFunction): Promise<void> {
  const { id } = req.params;

  try {
    const image: ImagePopulatedDocument = await Image.findOne({ imageId: id });
    if (!image) {
      res.error(...messages.errors.imageNotFound);
      return;
    }

    const imagePath = path.join(constants.uploadPath, image.application.applicationId, image.savedName);
    const mimeType = mime.contentType(path.extname(imagePath));
    const stats = await fs.stat(imagePath);

    res.success(messages.success.gotImageInformation, 200, {
      information: {
        mimeType,
        size: stats.size,
        creation: new Date(image.createdAt).getTime(),
        lastUpdate: new Date(image.updatedAt).getTime(),
        ...image.toData(),
      },
    });
  } catch (unknownError: unknown) {
    res.error(...messages.errors.serverError, unknownError as Error);
  }
}
