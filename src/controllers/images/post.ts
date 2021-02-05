import { extname, join } from 'path';
import type { NextFunction, Request, Response } from 'express';
import { nanoid } from 'nanoid';

import constants from '@/app/config/constants';
import Application from '@/app/models/application';
import Image from '@/app/models/image';


/**
 * POST controller for the 'images' route
 * @description Create a new image
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {Function} next - The next callback
 */
export async function createImage(req: Request, res: Response, _next: NextFunction): Promise<void> {
  if (!req.files || Object.keys(req.files).length === 0) {
    res.error('No file was provided', 400);
    return;
  }

  const image = Array.isArray(req.files.image) ? req.files.image[0] : req.files.image;
  try {
    const application = await Application.findById(req.application._id);

    // /public/uploads/APP_ID/IMG_ID.ext
    const imageId = nanoid(10);
    const savedName = `${imageId}${extname(image.name)}`;
    const path = join(constants.uploadPath, application.id, savedName);

    image.mv(path, async (err?: Error) => {
      if (err) {
        res.error('Something went wrong...', 500);
        return;
      }

      try {
        const newImage = await Image.create({
          application: application._id,
          originalName: image.name,
          savedName,
          id: imageId,
        });

        res.success('Success!', 200, { image: newImage.toData() });
      } catch (unknownError: unknown) {
        res.error('Oops... Something went wrong.', 500, unknownError as Error);
      }
    });
  } catch (unknownError: unknown) {
    res.error('Oops... Something went wrong.', 500, unknownError as Error);
  }
}
