import type { NextFunction, Request, Response } from 'express';
import messages from '@/app/config/messages';
import removeImageFromDisk from '@/app/helpers/remove-image-from-disk';
import Image from '@/app/models/image';

/**
 * DELETE controller for the 'images' route
 * @description Delete an image from disk and database
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {Function} next - The next callback
 */
export async function deleteImage(req: Request, res: Response, _next: NextFunction): Promise<void> {
  const { id } = req.params;

  if (!id) {
    res.error(...messages.errors.noIdProvided);
    return;
  }

  try {
    const image = await Image.findOne({ imageId: id });
    if (!image) {
      res.error(...messages.errors.imageNotFound);
      return;
    }

    await removeImageFromDisk(image);
    await Image.deleteOne({ imageId: id });

    res.success(messages.success.removedImage);
  } catch (unknownError: unknown) {
    res.error(...messages.errors.serverError, unknownError as Error);
  }
}

/**
 * DELETE controller for the 'images' route
 * @description Delete all images of an application from
 * disk and database
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {Function} next - The next callback
 */
export async function deleteAllImages(req: Request, res: Response, _next: NextFunction): Promise<void> {
  try {
    const appId = req.application._id;
    const images = await Image.find({ application: appId });
    if (images.length === 0) {
      res.success(messages.success.removedImages);
      return;
    }

    for (const image of images)
      await removeImageFromDisk(image); // eslint-disable-line no-await-in-loop

    await Image.deleteMany({ application: appId });

    res.success(messages.success.removedImages);
  } catch (unknownError: unknown) {
    res.error(...messages.errors.serverError, unknownError as Error);
  }
}
