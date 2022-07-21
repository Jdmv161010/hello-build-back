const { MulterError } = require("multer");
const { StatusCodes } = require("http-status-codes");
const { ValidationError } = require("express-json-validator-middleware");

function validateMiddleware(error, request, response, next) {
  let msg = "";

  if (error instanceof ValidationError) {
    console.log(error.validationErrors.body[0].params);
    const { dataPath, message } = error.validationErrors.body[0];
    msg = `${dataPath} ${message}`;
  } else if (error instanceof MulterError) {
    console.log(error);
    msg = error.message;
  } else {
    next(error);
  }

  response.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ msg });
  next();
}

module.exports = {
  validateMiddleware,
};
