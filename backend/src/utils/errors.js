class GeneralError extends Error {
  constructor(message) {
    super();
    this.message = message;
  }

  getCode() {
    if (this instanceof BadRequest) {
      return 400;
    };
    
    if (this instanceof NotFound) {
      return 404;
    };

    if (this instanceof AuthorizedError) {
      return 401;
    }
    
    return 500;
  }
}

class BadRequest extends GeneralError { }
class NotFound extends GeneralError { }
class AuthorizedError extends GeneralError { }

module.exports = {
  GeneralError,
  BadRequest,
  NotFound,
  AuthorizedError
};