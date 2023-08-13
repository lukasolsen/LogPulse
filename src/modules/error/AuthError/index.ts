import {AuthError} from '../categories/Errors';

function isAuthError(error: any): error is AuthError {
  return error instanceof AuthError;
}

export {isAuthError};
