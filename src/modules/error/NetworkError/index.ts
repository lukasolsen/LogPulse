import {NetworkError} from '../categories/Errors';

function isNetworkError(error: any): error is NetworkError {
  return error instanceof NetworkError;
}

export {isNetworkError};
