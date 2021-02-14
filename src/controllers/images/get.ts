import { join } from 'path';
import type { NextFunction, Request, Response } from 'express';
import constants from '@/app/config/constants';
import messages from '@/app/config/messages';
// import validateNumber from '@/app/helpers/validate-number';
// import validateRange from '@/app/helpers/validate-range';
import applyFilters from '@/app/helpers/apply-filters';
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

  const filters: Record<string, unknown> = Object.fromEntries(
    Object.entries(req.query)
      .filter((filtersOptions): filtersOptions is [filter: string, option: string] => typeof filtersOptions[0] === 'string' && typeof filtersOptions[1] === 'string'),
  );

  const path = join(constants.uploadPath, image.application.applicationId, image.savedName);
  const img = await applyFilters(path, filters); // Get the image btw

  // if (validateNumber(filters?.greyscale) && validateRange(filters.greyscale, 0, 100))
  //   console.log('greyscale', filters.greyscale, typeof filters?.greyscale);

  // res.sendFile(join(constants.uploadPath, image.application.applicationId, image.savedName));
  res.set('Content-Type', 'image/png');
  res.send(img);
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
