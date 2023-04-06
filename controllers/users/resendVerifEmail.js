const nodemailer = require("nodemailer");
require("dotenv").config();

const { User } = require("../../schemas/userSchema");
const { returnError } = require("../../helpers");

const { NODEMAILER_USER, NODEMAILER_USER_PASS } = process.env;

const resendVerifEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw returnError(404, "No user found");
  }
  if (user.verify) {
    throw returnError(404, "Verification has already been passed");
  }

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
    subject: "Verify your email - second chanse",
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${user.verificationToken}">Click to verify your email</a>`,
  };

  transport
    .sendMail(mail)
    .then(() => console.log("sent verif email"))
    .catch((error) => error.message);

  res.json({
    message: "Verification email sent",
  });
};

module.exports = resendVerifEmail;
