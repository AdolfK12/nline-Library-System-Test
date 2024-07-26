const errorHandler = (err, req, res, next) => {
  console.error(err);
  let code = 500;
  let msg = "Internal server error";

  switch (err.name) {
    case "SequelizeValidationError":
      code = 400;
      msg = err.errors.map((el) => el.message);
      break;
    case "SequelizeUniqueConstraintError":
      code = 400;
      msg = err.errors.map((el) => el.message).join(", ");
      break;
    case "ValidationError":
      code = 400;
      msg = err.message;
      break;
    case "InvalidEmailDomain":
      code = 400;
      msg =
        "Email domain is not valid. Allowed domains: gmail.com, hotmail.com, yahoo.com, outlook.com";
      break;
    case "InvalidPassword":
      code = 400;
      msg =
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number without any special characters.";
      break;
    case "EmailNotUnique":
      code = 400;
      msg = "Email is already registered.";
      break;
    case "UserCannotBorrowMultipleBooks":
      code = 400;
      msg = "User can only borrow one book at a time.";
      break;
    case "BookAlreadyLoaned":
      code = 400;
      msg = "The book has already been loaned.";
      break;
    case "NoInput":
      code = 400;
      msg = "Email/password required.";
      break;
    case "GenreNotFound":
      code = 400;
      msg = "Genre not found.";
      break;
    case "LoginFailed":
      code = 401;
      msg = "Email/password invalid.";
      break;
    case "Unauthorized":
      code = 401;
      msg = "Access token required.";
      break;
    case "DataNotFound":
      code = 404;
      msg = "No active loan found for this book.";
      break;
    case "BookReturnLate":
      code = 400;
      msg = "The book return is late.";
      break;
    default:
      if (err.message) {
        msg = err.message;
      }
  }

  res.status(code).json({
    error: msg,
  });
};

module.exports = errorHandler;
