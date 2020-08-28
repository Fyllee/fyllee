export default (req, res, next) => {
  /**
   * @type {RequestHandler}
   * @param {String} message Message to display to usert
   * @param {Number | 200} statusCode Status code to return
   * @param {Object} objects Optional objects to display to the user
   */
  res.success = (message, statusCode = 200, objects = {}) => {
    res.status(statusCode).json({ message, ...objects });
  };

  /**
   * @type {RequestHandler}
   * @param {String} message Message to display to usert
   * @param {Number} statusCode Status code to return
   * @param {Error} error The error to log in the console
   */
  res.error = (message, statusCode, error = {}) => {
    if (error instanceof Error)
      console.error(error); // Must be replaced by a logger

    res.status(statusCode).json({ message, ...error });
  };

  next();
};
