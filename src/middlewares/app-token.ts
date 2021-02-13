import type { NextFunction, Request, Response } from 'express';
import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import { ExtractJwt } from 'passport-jwt';
import Application from '@/app/models/application';
import type { JwtPayload } from '@/app/types';
import messages from '../config/messages';

export default async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
  if (!token)
    return res.error(...messages.errors.noTokenProvided);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
    if (!decoded?._id)
      return res.error(...messages.errors.invalidToken);

    const app = await Application.findById(decoded._id);
    if (!app)
      return res.error(...messages.errors.applicationNotFound);

    delete decoded.iat;
    req.application = decoded;

    // eslint-disable-next-line node/callback-return
    next();
  } catch (unknownError: unknown) {
    if (unknownError instanceof JsonWebTokenError)
      return res.error(...messages.errors.invalidToken);

    res.error(...messages.errors.serverError);
    console.error(unknownError as Error);
  }
};
