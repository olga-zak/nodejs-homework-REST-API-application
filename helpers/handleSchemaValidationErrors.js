const isConflict = ({ name, code }) =>
  name === "MongoServerError" && code === 11000;

const handleSchemaValidationErrors = (error, data, next) => {
  console.log("errorHandler from userSchema file");

  error.status = isConflict(error) ? 409 : 400;
  //const { name, code } = error;
  // if (name === "MongoServerError" && code === 11000) {
  //   error.status = 409;
  // } else {
  //   error.status = 400;
  //   next();
  // }
};

module.exports = handleSchemaValidationErrors;
