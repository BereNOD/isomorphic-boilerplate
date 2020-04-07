import { validationResult } from 'express-validator';

/**
 * Generate error if validation failure. Used express-validator.
 * @param  {http.ServerResponse}   req  [description]
 * @param  {http.ServerResponse}   response
 * @param  {Function}              next     Node method "next" for call next handle by route
 * @return Used only for break function execution
 */
const validationResultMiddleware = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(typeof errors.array(), errors.array());
    return next([errors.array(), 422]);
  }

  return next();
};

export default validationResultMiddleware;
