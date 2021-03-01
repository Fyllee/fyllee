import type { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import type { IVerifyOptions } from 'passport-local';
import User from '@/app/models/user';
import type { UserDocument } from '@/app/types/models';
import messages from '../config/messages';


/**
 * POST controller for the '/auth/login' route
 * @description Login the user, for him to have his user Token
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {Function} next - The next callback
 */
export function login(req: Request, res: Response, next: NextFunction): void {
  passport.authenticate('local', { session: false }, (err, user: UserDocument, info: IVerifyOptions) => {
    if (err)
      return next(err);

    if (!user) {
      if (info.message === messages.flash.invalidPassword)
        return res.error(...messages.errors.invalidPassword);
      return res.error(...messages.errors.userNotFound);
    }

    req.login(user, { session: false }, (err2) => {
      if (err2)
       return res.error(...messages.errors.serverError, err2);

      res.success(messages.success.loggedIn, 200, { user: user.toData(), token: user.token });
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

  if (!bodyContainsAllRequired)
    return res.error(...messages.errors.missingParameters);

  try {
    const user = await User.findOne({ email: req.body.email });
    if (user)
      return res.error(...messages.errors.userAlreadyExists);

    const newUser = await User.create(req.body);

    res.success(messages.success.registered, 200, { user: newUser.toData() });
  } catch (unknownError: unknown) {
    res.error(...messages.errors.serverError, unknownError as Error);
  }
}
