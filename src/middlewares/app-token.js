import jwt from 'jsonwebtoken';
import { ExtractJwt } from 'passport-jwt';

export default (req, res, next) => {
  const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.appId)
      throw new Error('Bad token');

    return next();
  } catch (err) {
    console.error(err);
    return res.message('Bad token', 401);
  }
};
