const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { User } = require("../../schemas/userSchema");

const { returnError } = require("../../helpers");

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  //если пытается заголиниться юзер с email которого а базе нет
  if (!user) {
    throw returnError(401, "email! or password is wrong");
  }
  //если есть юзер с email в базе, то сравниваем пароли (password - от пользователя, user.password - пароль из базы)
  const passwordCompare = await bcrypt.compare(password, user.password);
  //если password не подходит, выбрасываем ошибку
  if (!passwordCompare) {
    returnError(401, "email or password! is wrong");
  }
  //если юзер есть и password ок
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });

  await User.findByIdAndUpdate(
    user._id,
    { token },
    {
      new: true,
    }
  );

  res.json({
    token,
    user: {
      email,
      subscription: user.subscription,
    },
  });
};

module.exports = login;
