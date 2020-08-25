export default (req, res, next) => {
  /**
   * @type {RequestHandler}
   * @param {String} message Message to display to usert
   * @param {Object} objects Optional objects to display to the user
   * @param {Number | 200} statusCode Status code to return
   */
  res.message = (message, objects = {}, statusCode = 200) => {
    res.status(statusCode).json({ message, ...objects });
  };

  res.message = (message, statusCode = 200) => {
    res.status(statusCode).json({ message });
  };

  next();
};
