import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { ExtractJwt } from 'passport-jwt';
import Application from '@/app/models/application';
import type { JwtPayload } from '@/app/types';

export default async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
  if (!token) {
    res.error('No token provided', 404);
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
    if (!decoded._id)
      throw new Error('Bad token');

    const app = await Application.findById(decoded._id);
    if (!app)
      throw new Error('Application not found');

    delete decoded.iat;
    req.application = decoded;

    // eslint-disable-next-line node/callback-return
    next();
  } catch (unknownError: unknown) {
    if ((unknownError as Error).message === 'Bad token' || (unknownError as Error).message === 'invalid signature')
      res.error('Bad token', 401);
    else
      res.error('Application not found', 404);
  }
};
