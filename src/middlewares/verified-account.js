import jwt from 'jsonwebtoken';
import { ExtractJwt } from 'passport-jwt';
import User from '../models/user';

export default async (req, res, next) => {
  const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded._id)
      throw new Error('Bad token');

    const user = await User.findById(decoded._id);
    if (!user)
      throw new Error('User not found');

    if (!user.verified)
      res.error('User account is not verified', 403);

    return next();
  } catch (err) {
    if (err.message === 'Bad token')
      return res.error('Bad token', 401);

    return res.error('User not found', 404);
  }
};
