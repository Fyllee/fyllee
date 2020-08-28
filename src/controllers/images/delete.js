import removeImageFromDisk from '../../helpers/remove-image-from-disk';
import Application from '../../models/application';
import Image from '../../models/image';

/**
 * DELETE controller for the 'images' route
 * @description Delete an image from disk and database
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {Function} next - The next callback
 */
export async function deleteImage(req, res, _next) {
  const { id } = req.params;

  if (!id)
    return res.error('No id was provided', 400);

  try {
    const image = await Image.findOne({ id });
    if (!image)
      return res.error('Image not found', 404);

    await removeImageFromDisk(image);
    await Image.deleteOne({ id });

    res.success('Success!', 200);
  } catch (err) {
    return res.error('Something went wrong...', 500, err);
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
export async function deleteAllImages(req, res, _next) {
  try {
    const appId = req.application.id;
    const application = await Application.findOne({ id: appId });
    const images = await Image.find({ application: application._id });
    if (images.length === 0)
      return res.success('Success');

    for (const image of images)
      await removeImageFromDisk(image); // eslint-disable-line no-await-in-loop

    await Image.deleteMany({ application: application._id });

    res.success('Success!');
  } catch (err) {
    return res.error('Something went wrong...', 500, err);
  }
}
