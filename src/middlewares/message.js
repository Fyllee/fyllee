export default (req, res, next) => {
  /**
   * @type {RequestHandler}
   * @param {String} message Message to display to usert
   * @param {Object} objects Optional objects to display to the user
   * @param {Number | 200} statusCode Status code to return
   */
  res.success = (message, statusCode, objects = {}) => {
    res.status(statusCode).json({ message, ...objects });
  };

  res.error = (message, statusCode, error = {}) => {
    if (Object.keys(error).length !== 0)
      console.error(error); // Must be replaced by a logger

    res.status(statusCode).json({ message, ...error });
  };

  next();
};
