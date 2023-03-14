const bcrypt = require("bcryptjs");

const { User } = require("../../schemas/userSchema");

const { returnError } = require("../../helpers");

const register = async (req, res, next) => {
  const { email, password } = req.body;
  console.log(email);
  //check if email exists
  const user = await User.findOne({ email });
  if (user) {
    throw returnError(409, `email ${email} already exists`);
  }
  //if email doesn't exist -> захешировать password + add user to the db
  const hashPassword = await bcrypt.hash(password, 10);
  const result = await User.create({ email, password: hashPassword });
  res.status(201).json({
    user: { email: result.email, subscription: result.subscription },
  });
};

module.exports = register;
