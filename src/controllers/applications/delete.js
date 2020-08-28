import removeApplicationFromDisk from '../../helpers/remove-application-from-disk';
import Application from '../../models/application';
import User from '../../models/user';


/**
 * DELETE controller for the 'applications' route
 * @description Delete an application from disk and database and
 * all the images it contains
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {Function} next - The next callback
 */
export async function deleteApplication(req, res, _next) {
  const { id } = req.params;

  if (!id)
    return res.error('No id was provided', 400);

  try {
    const application = await Application.findOne({ id });
    if (!application)
      return res.error('Application not found', 404);

    await removeApplicationFromDisk(application);
    await Application.deleteOne({ id });

    res.success('Success!', 200);
  } catch (err) {
    return res.error('Something went wrong...', 500, err);
  }
}

/**
 * DELETE controller for the 'applications' route
 * @description Delete alls applications from disk and database and
 * all the images they contain
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {Function} next - The next callback
 */
export async function deleteAllApplications(req, res, _next) {
  try {
    const ownerId = req.user._id;
    const applications = await Application.find({ owner: ownerId });
    if (applications.length === 0)
      return res.success('Success!');

    for (const application of applications)
      await removeApplicationFromDisk(application); // eslint-disable-line no-await-in-loop

    await Application.deleteMany({ owner: ownerId });

    res.success('Success!');
  } catch (err) {
    return res.error('Something went wrong...', 500, err);
  }
}
