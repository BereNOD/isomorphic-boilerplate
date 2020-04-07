import HttpStatus from 'http-status-codes';
import _ from 'lodash';

import Log from '/utils/Log';

/**
 * Custom Error for create one interface for all errors.
 * Used interface from errors array from https://express-validator.github.io/docs/ with extras error fields:
 * @param           {integer}   status    Http status
 * @param(optional) {string}    message   Error description
 *
 * Example:
 *    {
 *      "status": 422,
 *      "errors": [
 *        {
 *          "msg": "Email is required.",
 *          "location": "query",
 *          "param": "test",
 *          "value": "1"
 *        },
 *        {
 *          "msg": "Email is invalid.",
 *          "location": "query",
 *          "param": "test",
 *          "value": "1"
 *        }
 *      ]
 *    }
 */
class Error {
  status = 422;

  /**
   * For using need lead error instance to string.
   * Error constructor get 3 params:
   *    @param           {Array|String|Plain object|Null}   errors    Variants:
   *      Array: only with express-validator errors array schema, message or msg fiels is required
   *      String: transform to collection with one error by express-validator errors array schema
   *      Plain object: one error of express-validator errors array
   *      Null: when need generate error from statuc code message
   *    @param           {integer}                          status    Http status
   *    @param(optional) {string}                           message   Error description
   */
  constructor(errors, status, message) {
    if (!_.isUndefined(status) && !_.isNull(status)) {
      if (_.isInteger(status) && status > 0 && status < 600) {
        this.status = status;
      } else {
        Log('Passed status is invalid, used default status.');
      }
    }

    if (!_.isUndefined(message) && !_.isNull(message)) {
      if (_.isString(message)) {
        this.message = message;
      } else {
        Log('Passed message must be a string');
      }
    }

    switch (true) {
      case _.isArray(errors):
        this.errors = _.map(errors, Error.validationError);
        break;
      case _.isString(errors):
        this.errors = [ {
          msg: errors
        } ];
        break;
      case _.isPlainObject(errors):
        this.errors = [ Error.validationError(errors) ];
        break;
      case _.isNull(errors):
        try {
          this.errors = [ {
            msg: HttpStatus.getStatusText(status)
          } ];
        } catch (e) {
          this.errors = [ {
            mgs: e.message
          } ];
        }
        break;
      default:
        throw 'Failure error generation: 1st param must be Array, String, Plain object or Null.';
    }
  }

  static validationError = (error, index) => {
    if (
      !_.isPlainObject(error)
      || !(
        (_.has(error, 'msg') && _.isString(error.msg))
        || (_.has(error, 'message') && _.isString(error.message))
      )
    ) {
      throw `Invalid error.${_.isInteger(index) ? ` Index ${index}` : ''}`;
    }

    const _error = {
      msg: error.msg ? error.msg : error.message
    };

    if (_.has(error, 'location') && _.isString(error.location)) {
      _error.location = error.location;
    } else {
      // eslint-disable-next-line
      Log(`Invalid error:${_.isInteger(index) ? ` error with index ${index}` : ''} has no value with type string by "location" key.`);
    }

    if (_.has(error, 'param') && _.isString(error.param)) {
      _error.param = error.param;
    } else {
      // eslint-disable-next-line
      Log(`Invalid error:${_.isInteger(index) ? ` error with index ${index}` : ''} has no value with type string by "param" key.`);
    }

    if (_.has(error, 'value') && _.isString(error.value)) {
      _error.value = error.value;
    } else {
      // eslint-disable-next-line
      Log(`Invalid error:${_.isInteger(index) ? ` error with index ${index}` : ''} has no value with type string by "value" key.`);
    }

    return _error;
  };
}

export default Error;
