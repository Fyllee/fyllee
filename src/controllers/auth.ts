import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import User from '../models/user';


/**
 * POST controller for the '/auth/login' route
 * @description Login the user, for him to have his user Token
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {Function} next - The next callback
 */
export function login(req: Request, res: Response, next: NextFunction): void {
  passport.authenticate('local', { session: false }, (err, user, _info) => {
    if (err) {
      next(err);
      return;
    }

    if (!user) {
      res.error('User does not exist.', 400);
      return;
    }

    req.login(user.toJWT(), { session: false }, (err2) => {
      if (err2) {
       res.error('Something went wrong.', 400, err2);
       return;
      }

      const token = jwt.sign(user.toJWT(), process.env.JWT_SECRET);
      res.json({ message: 'You are now logged in.', user: user.toData(), token });
    });
  })(req, res, next);
}


/**
 * POST controller for the '/auth/register' route
 * @description Create a new user
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {Function} next - The next callback
 */
export async function register(req: Request, res: Response, _next: NextFunction): Promise<void> {
  const bodyContainsAllRequired = req.requiredParameters(User);

  if (!bodyContainsAllRequired) {
    res.error('Missing body parameters.', 400);
    return;
  }

  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      res.error('User already exists.', 409);
      return;
    }

    const newUser = await User.create(req.body);

    res.json({ user: newUser.toData() });
  } catch (unknownError: unknown) {
    res.error('Oops... Something went wrong.', 500, unknownError as Error);
  }
}
