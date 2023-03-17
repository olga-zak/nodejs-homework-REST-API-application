const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");

const { User } = require("../../schemas/userSchema");

const { returnError } = require("../../helpers");

const register = async (req, res, next) => {
  const { email, password } = req.body;
  //check if email exists in db
  const user = await User.findOne({ email });
  if (user) {
    throw returnError(409, `email ${email} is in use`);
  }
  //if email doesn't exist in db -> захешировать password + create temp.avatar + add user to the db
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const result = await User.create({
    email,
    password: hashPassword,
    avatarURL,
  });
  res.status(201).json({
    user: { email: result.email, subscription: result.subscription },
  });
};

module.exports = register;
