import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import User from '@/app/models/user';
import messages from '../config/messages';


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
      res.error(...messages.errors.userNotFound);
      return;
    }

    req.login(user.toJWT(), { session: false }, (err2) => {
      if (err2) {
       res.error(...messages.errors.serverError, err2);
       return;
      }

      res.success(messages.success.loggedIn, 200, { user: user.toData() });
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
    res.error(...messages.errors.missingParameters);
    return;
  }

  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      res.error(...messages.errors.userAlreadyExists);
      return;
    }

    const newUser = await User.create(req.body);

    res.success(messages.success.registered, 200, { user: newUser.toData() });
  } catch (unknownError: unknown) {
    res.error(...messages.errors.serverError, unknownError as Error);
  }
}
