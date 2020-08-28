import { join, extname } from 'path';
import { nanoid } from 'nanoid';

import constants from '../../config/constants';
import Application from '../../models/application';
import Image from '../../models/image';


/**
 * POST controller for the 'images' route
 * @description Create a new image
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {Function} next - The next callback
 */
export async function createImage(req, res, _next) {
  if (!req.files || Object.keys(req.files).length === 0)
    return res.error('No file was provided', 400);

  const { image } = req.files;
  try {
    const application = await Application.findById(req.application._id);

    // /public/uploads/APP_ID/IMG_ID.ext
    const imageId = nanoid(10);
    const savedName = `${imageId}${extname(image.name)}`;
    const path = join(constants.uploadPath, application.id, savedName);

    image.mv(path, async (err) => {
      if (err)
        return res.success('Something went wrong...', 500);

      try {
        const newImage = await Image.create({
          application: application._id,
          originalName: image.name,
          savedName,
          id: imageId,
        });

        res.success('Success!', 200, { image: newImage.toData() });
      } catch (error) {
        return res.error('Oops... Something went wrong.', 500, error);
      }
    });
  } catch (error) {
    return res.error('Oops... Something went wrong.', 500, error);
  }
}
