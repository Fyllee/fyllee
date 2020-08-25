export default (req, res, next) => {
  /**
   * @param {Model} model The model to compare the body against
   */
  req.requiredParameters = (model) => {
    const required = model.schema.requiredPaths();
    const body = Object.keys(req.body);

    return required.every(e => body.includes(e));
  };

  next();
};
