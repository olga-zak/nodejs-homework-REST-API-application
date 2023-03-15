const { returnError } = require("../helpers");

const validateBody = (schema) => {
  const func = async (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(
        returnError(
          400,
          `Missing or already existing some of fields: ${error.message}`
        )
      );
    }
    next();
  };
  return func;
};

module.exports = validateBody;
