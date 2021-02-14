import type { NextFunction, Request, Response } from 'express';
import messages from '@/app/config/messages';
import FilterManager from '@/app/helpers/FilterManager';
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
  if (!image)
    return res.error(...messages.errors.imageNotFound);

  const filterManager = new FilterManager(req.query, image);
  const modifiedImage = await filterManager.run();

  res.set('Content-Type', filterManager.jimpImage.getMIME());
  res.send(modifiedImage);
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

    res.success(messages.success.gotImages, 200, { images: saneImages });
  } catch (unknownError: unknown) {
    res.error(...messages.errors.serverError, unknownError as Error);
  }
}
