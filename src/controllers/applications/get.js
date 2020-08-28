import Application from '../../models/application';

/**
 * GET controller for the 'application' route
 * @description Send back the application data
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {Function} next - The next callback
 */
export async function getApplication(req, res, _next) {
  const { id } = req.body;

  const application = await Application.findOne({ id });
  if (!application)
    return res.error('Application not found', 404);

  res.json({ application: application.toData() });
}
