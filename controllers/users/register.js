const { User } = require("../../schemas/userSchema");

const { returnError } = require("../../helpers");

const register = async (req, res, next) => {
  const { name, email, password } = req.body;
  console.log(email);
  //check if email exists
  const user = await User.findOne({ email });
  if (user) {
    throw returnError(409, `email ${email} already exists`);
  }
  //if email doesn't exist -> add it to the db
  const result = await User.create({ name, email, password });
  res.status(201).json({
    name: result.name,
    email: result.email,
  });
};

module.exports = register;
