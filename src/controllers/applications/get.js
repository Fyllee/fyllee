import Application from '../../models/application';

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
  const ownerId = req.user._id;
  const applications = await Application.find({ owner: ownerId });

  const saneApplications = [];
  for (const application of applications)
    saneApplications.push(application.toData());

  res.json({ applications: saneApplications });
}
