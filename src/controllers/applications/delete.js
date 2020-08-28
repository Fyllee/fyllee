import { promises as fs } from 'fs';
import { join } from 'path';

import constants from '../../config/constants';
import Application from '../../models/application';
import Image from '../../models/image';

/**
 * DELETE controller for the 'application' route
 * @description Delete an application from disk and database and
 * all the images it contains
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {Function} next - The next callback
 */
export async function deleteApplication(req, res, _next) {
  const { id } = req.body;

  if (!id)
    return res.error('No id was provided', 400);

  try {
    const application = await Application.findOne({ id });
    if (!application)
      return res.error('Application not found', 404);

    const images = await Image.find({ application: application._id });

    const folderPath = join(constants.uploadPath, application.id);
    const folder = await fs.stat(folderPath);

    const promises = [];
    if (folder) {
      for (const image of images)
        promises.push(fs.unlink(join(constants.uploadPath, application.id, image.savedName)));
    }

    promises.push(Image.deleteMany({ application: application._id }));
    await Promise.all(promises);

    // Delete from storage and database
    if (folder)
      await fs.rmdir(folderPath);
    await Application.deleteOne({ id });

    res.success('Success!', 200);
  } catch (err) {
    return res.error('Something went wrong...', 500, err);
  }
}
