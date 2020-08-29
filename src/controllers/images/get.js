import { join } from 'path';
import constants from '../../config/constants';
import Image from '../../models/image';

/**
 * GET controller for the 'images' route
 * @description Send back the given image
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {Function} next - The next callback
 */
export async function getImage(req, res) {
  const { id } = req.params;

  const image = await Image.findOne({ id });
  if (!image)
    return res.error('Image not found', 404);

  res.sendFile(join(constants.uploadPath, image.application.id, image.savedName));
}

/**
 * GET controller for the 'images' route
 * @description Send back an array of all images the application has,
 * with data about them.
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {Function} next - The next callback
 */
export async function getAllImages(req, res) {
  try {
    const appId = req.application._id;
    const images = await Image.find({ application: appId });

    const saneImages = [];
    for (const image of images)
      saneImages.push(image.toData());

    res.json({ images: saneImages });
  } catch (err) {
    res.error('Something went wrong...', 500, err);
  }
}
