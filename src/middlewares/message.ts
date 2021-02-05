import type { NextFunction, Request, Response } from 'express';

export default (_req: Request, res: Response, next: NextFunction): void => {
  /**
   * @type {RequestHandler}
   * @param {String} message Message to display to usert
   * @param {Number} statusCode Status code to return. Defaults to 200.
   * @param {Object} objects Optional objects to display to the user
   */
  res.success = (message: string, statusCode = 200, objects: Record<string, unknown> = {}): void => {
    res.status(statusCode).json({ message, ...objects });
  };

  /**
   * @type {RequestHandler}
   * @param {String} message Message to display to usert
   * @param {Number} statusCode Status code to return
   * @param {Error} error The error to log in the console
   */
  res.error = (message: string, statusCode: number, error: Error | Record<string, unknown> = {}): void => {
    if (error instanceof Error)
      console.error(error); // Must be replaced by a logger

    res.status(statusCode).json({ message, ...error });
  };

  next();
};
