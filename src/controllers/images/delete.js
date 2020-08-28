import { promises as fs } from 'fs';
import { join } from 'path';

import constants from '../../config/constants';
import Image from '../../models/image';


/**
 * DELETE controller for the 'images' route
 * @description Delete an image from disk and database
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {Function} next - The next callback
 */
export async function deleteImage(req, res, _next) {
  const { id } = req.body;

  if (!id)
    return res.error('No id was provided', 400);

  try {
    const image = await Image.findOne({ id });
    if (!image)
      return res.error('Image not found', 404);

    const filePath = join(constants.uploadPath, image.application.id, image.savedName);
    const file = await fs.stat(filePath);

    // Delete from storage and database
    if (file)
      await fs.unlink(filePath);
    await Image.deleteOne({ id });

    res.success('Success!', 200);
  } catch (err) {
    return res.error('Something went wrong...', 500, err);
  }
}
