/* @flow strict */

import { HOST } from './../../config.js';
import { toast } from 'react-toastify';

const headers = {
  'Content-Type': 'application/json',
  'X-Requested-With': 'XMLHttpRequest'
};

const next = async (response: Response): Promise<any> => {
  const result  = await response.json();

  if (response.status >= 300) {
    const errors = _.get(result, 'errors', []);

    if (_.size(errors) > 0) {
      _.forEach(errors, (error: { msg: string }) => {
        if (_.has(error, 'msg')) {
          toast.error(_.get(error, 'msg'));
        }
      });
    } else {
      toast.error('Failure!');
    }

    throw response;
  }

  toast.success('Success!');
  return result;
};

export const GET = async (url: string): Promise<any> => await fetch(`${HOST}${url}`, {
  method: 'GET',
  headers
})
  .then(next);

export const POST = async (url: string, data: any): Promise<any> => await fetch(`${HOST}${url}`, {
  method: 'POST',
  headers,
  body: JSON.stringify(data)
})
  .then(next);

export const PUT = async (url: string, data: any): Promise<any> => await fetch(`${HOST}${url}`, {
  method: 'PUT',
  headers,
  body: JSON.stringify(data)
})
  .then(next);

export const DELETE = async (url: string): Promise<any> => await fetch(`${HOST}${url}`, {
  method: 'DELETE',
  headers
})
  .then(next);
