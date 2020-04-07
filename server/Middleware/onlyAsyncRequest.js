/* @flow strict */

export const notAsyncErrorMessage = originalUrl =>
  `${originalUrl} must only be used async.`;

/**
 * Middleware for allow only AJAX requests to route
 * @param  {boolean}               xhr         flag, which show is request type
 *                                             true - async, false - sync
 * @param  {string}                originalUrl pathname from url string
 * @param  {http.ServerResponse}   response
 * @param  {Function}              next     Node method "next" for call next handle by route
 * @return Used only for break function execution
 */
const onlyAsyncRequest = ({ xhr, originalUrl }, response, next) => {
  if (!xhr) {
    return next(notAsyncErrorMessage(originalUrl));
  }
  return next();
};

export default onlyAsyncRequest;
