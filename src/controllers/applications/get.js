import Application from '../../models/application';
import User from '../../models/user';

/**
 * GET controller for the 'application' route
 * @description Send back the application data
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {Function} next - The next callback
 */
export async function getApplication(req, res, _next) {
  const { id } = req.params;

  const application = await Application.findOne({ id });
  if (!application)
    return res.error('Application not found', 404);

  res.json({ application: application.toData() });
}

/**
 * GET controller for the 'application' route
 * @description Send back an array of all applications the user has,
 * with data about them.
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {Function} next - The next callback
 */
export async function getAllApplications(req, res, _next) {
  const { id } = req.user;

  const user = await User.findOne({ id });
  const applications = await Application.find({ owner: user._id });

  const saneApplications = [];
  for (const application of applications)
    saneApplications.push(application.toData());

  res.json({ applications: saneApplications });
}
