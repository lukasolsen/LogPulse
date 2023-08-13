import {InferenceOutputError} from '@huggingface/inference';

class NetworkError extends Error {}
class AuthError extends Error {
  constructor(error: Error) {
    super(error.message);
    this.check();
  }

  private check() {
    if (this.message === 'Unauthorized') {
      this.message =
        'HuggingFace API is not available at the moment. (Unauthorized)';
    }

    //Check if the error is an InferenceOutputError
    if (this.name === InferenceOutputError.name) {
      this.message =
        'HuggingFace API is not available at the moment. (InferenceOutputError)';
    }
  }
}
class ValidationError extends Error {}

export {NetworkError, AuthError, ValidationError};
