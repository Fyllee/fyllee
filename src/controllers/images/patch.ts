import type { NextFunction, Request, Response } from 'express';
import messages from '@/app/config/messages';
import Image from '@/app/models/image';


/**
 * PATCH controller for the 'images' route
 * @description Rename an image
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {Function} next - The next callback
 */
export async function renameImage(req: Request, res: Response, _next: NextFunction): Promise<void> {
  const { id } = req.params;

  if (!id)
    return res.error(...messages.errors.noIdProvided);

  if (typeof req.body.renameTo !== 'string')
    return res.error(...messages.errors.missingParameters);

  try {
    const image = await Image.findOne({ imageId: id });
    if (!image)
      return res.error(...messages.errors.imageNotFound);

    await Image.findByIdAndUpdate(image._id, { originalName: req.body.renameTo });

    res.success(messages.success.renamedImage);
  } catch (unknownError: unknown) {
    res.error(...messages.errors.serverError, unknownError as Error);
  }
}
