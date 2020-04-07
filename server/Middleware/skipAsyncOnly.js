/* @flow strict */

import { Router } from 'express';
import onlyAsyncRequest, {
  notAsyncErrorMessage
} from '/Middleware/onlyAsyncRequest.js';

/**
 * Router wrapper for only skip to proccessing requests,
 * which has header X-Requested-With field with value “XMLHttpRequest”.
 *
 * @param {router} instance of Express' router.
 *
 * @return Array with wrapper router,
 *         which has middleware for check is it AJAX request in start and error handler if it's true at the end.
 */
const skipAsyncOnly = router => {
  if (!router || Object.getPrototypeOf(router) !== Router) {
    throw new Error('The "router" is not an instance of Express Router.');
  }

  return [
    onlyAsyncRequest,

    router,

    (error, { originalUrl }, res, next) => {
      if (error === notAsyncErrorMessage(originalUrl)) {
        return next();
      }

      return next(error);
    }
  ];
};

export default skipAsyncOnly;
