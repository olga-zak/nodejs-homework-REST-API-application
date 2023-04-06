const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { v4: uuidv4 } = require("uuid");
const nodemailer = require("nodemailer");
require("dotenv").config();

const { User } = require("../../schemas/userSchema");

const { returnError } = require("../../helpers");

const { NODEMAILER_USER, NODEMAILER_USER_PASS } = process.env;

const register = async (req, res, next) => {
  const { email, password } = req.body;
  //check if email exists in db
  const user = await User.findOne({ email });
  if (user) {
    throw returnError(409, `email ${email} is in use`);
  }
  //if email doesn't exist in db -> захешировать password + create temp.avatar + create verificationToken + add user to the db
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = uuidv4();

  const result = await User.create({
    email,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  //send verifEmail
  const nodemailerConfig = {
    service: "gmail",
    host: "smtp.gmail.com",
    secure: false,
    auth: {
      user: NODEMAILER_USER,
      pass: NODEMAILER_USER_PASS,
    },
  };

  const transport = nodemailer.createTransport(nodemailerConfig);

  const mail = {
    to: email,
    from: NODEMAILER_USER,
    subject: "Verify your email",
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Click to verify your email</a>`,
  };

  transport
    .sendMail(mail)
    .then(() => console.log("sent verif email"))
    .catch((error) => error.message);

  res.status(201).json({
    user: { email: result.email, subscription: result.subscription },
  });
};

module.exports = register;
