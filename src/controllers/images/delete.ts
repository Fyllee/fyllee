import type { NextFunction, Request, Response } from 'express';
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
    res.error('No id was provided', 400);
    return;
  }

  try {
    const image = await Image.findOne({ id });
    if (!image) {
      res.error('Image not found', 404);
      return;
    }

    await removeImageFromDisk(image);
    await Image.deleteOne({ id });

    res.success('Success!', 200);
  } catch (unknownError: unknown) {
    res.error('Something went wrong...', 500, unknownError as Error);
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
      res.success('Success');
      return;
    }

    for (const image of images)
      await removeImageFromDisk(image); // eslint-disable-line no-await-in-loop

    await Image.deleteMany({ application: appId });

    res.success('Success!');
  } catch (unknownError: unknown) {
    res.error('Something went wrong...', 500, unknownError as Error);
  }
}
