const register = require("./register");
const login = require("./login");
const logout = require("./logout");
const getCurrentUser = require("./getCurrentUser");
const updateUserAvatar = require("./updateUserAvatar");
const verifyEmail = require("./verifyEmail");
const resendVerifEmail = require("./resendVerifEmail");

module.exports = {
  register,
  login,
  logout,
  getCurrentUser,
  updateUserAvatar,
  verifyEmail,
  resendVerifEmail,
};
