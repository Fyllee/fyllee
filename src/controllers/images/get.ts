import { join } from 'path';
import type { NextFunction, Request, Response } from 'express';
import constants from '@/app/config/constants';
import Image from '@/app/models/image';

/**
 * GET controller for the 'images' route
 * @description Send back the given image
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {Function} next - The next callback
 */
export async function getImage(req: Request, res: Response, _next: NextFunction): Promise<void> {
  const { id } = req.params;

  const image = await Image.findOne({ imageId: id });
  if (!image) {
    res.error('Image not found', 404);
    return;
  }

  res.sendFile(join(constants.uploadPath, image.application.applicationId, image.savedName));
}

/**
 * GET controller for the 'images' route
 * @description Send back an array of all images the application has,
 * with data about them.
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {Function} next - The next callback
 */
export async function getAllImages(req: Request, res: Response, _next: NextFunction): Promise<void> {
  try {
    const appId = req.application._id;
    const images = await Image.find({ application: appId });

    const saneImages = [];
    for (const image of images)
      saneImages.push(image.toData());

    res.json({ images: saneImages });
  } catch (unknownError: unknown) {
    res.error('Something went wrong...', 500, unknownError as Error);
  }
}
