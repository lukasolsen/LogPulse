import {ValidationError} from '../categories/Errors';

function isValidationError(error: any): error is ValidationError {
  return error instanceof ValidationError;
}

export {isValidationError};
