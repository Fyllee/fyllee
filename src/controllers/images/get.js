import { join } from 'path';
import constants from '../../config/constants';
import Image from '../../models/image';


/**
 * GET controller for the 'images' route
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {Function} next - The next callback
 */
export async function getImage(req, res) {
  const { id } = req.body;

  const image = await Image.findOne({ id }).populate('application');
  if (!image)
    return res.error('Image not found', 404);

  res.sendFile(join(constants.uploadPath, image.application.id, image.savedName));
}
