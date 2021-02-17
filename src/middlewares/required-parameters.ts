import type { NextFunction, Request, Response } from 'express';
import type { ApplicationModel, ContentModel, UserModel } from '@/app/types/models';

export default (req: Request, _res: Response, next: NextFunction): void => {
  /**
   * @param {Model} model The model to compare the body against
   * @param {Array | String} exclude Required fields to exclude
   */
  // eslint-disable-next-line max-len
  req.requiredParameters = (model: ApplicationModel | ContentModel | UserModel, exclude?: string[] | string): boolean => {
    const required = model.schema.requiredPaths();
    const body = Object.keys(req.body);

    if (exclude) {
      if (!Array.isArray(exclude))
        exclude = [exclude];

      exclude.forEach(e => required.splice(required.indexOf(e), 1));
    }

    return required.every(e => body.includes(e));
  };

  next();
};
