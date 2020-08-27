export default (req, res, next) => {
  /**
   * @param {Model} model The model to compare the body against
   * @param {Array | String} exclude Required fields to exclude
   */
  req.requiredParameters = (model, exclude) => {
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
