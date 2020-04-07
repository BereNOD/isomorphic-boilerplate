import _ from 'lodash';
import Error from './Error';
import chalk from 'chalk';

/**
 * Error handler. Work when in used next() in any request handler.
 * Use example:
 *    - next('error message');
 *    - next([errors, status[, message]]);
 *
 * Next processing can check in Error.js in this directory.
 * @param  {object}   App   Node application object
 */

export const errorHandler = err => {
  const _err = _.isArray(err) ? err : [err];

  if (err instanceof global.Error && 'message' in err) {
    _err[0] = _.get(err, 'response.data.result'); // message ? message : err.message;

    if (!_.isString(_err[0])) {
      _err[0] = _.get(err, 'response.data.result.error');
    }

    if (!_.isString(_err[0])) {
      _err[0] = err.message;
    }

    const errorStatus = err.status || _.get(err, 'response.status');

    _err[1] = errorStatus ? errorStatus : 500;
  }

  return new Error(..._err);
};

export default App => {
  // eslint-disable-next-line
  App.use((err, req, res, /* Don't remove next parameter! */ next) => {
    // Only 4 params handler called as error handler.
    const { status, ...error } = errorHandler(err);

    if (process.env.NODE_ENV === 'development') {
      console.log(chalk.red(`${status} | Error:`));
      console.log(err);
      console.log(chalk.blue('Generated errors:'));
      console.log(chalk.blue('-------------------------------'));
      console.log(chalk.gray(JSON.stringify(error.errors, null, 2)));
      console.log(chalk.blue('-------------------------------'));
    }

    res.status(status).json(error);
  });
};
