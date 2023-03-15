const jwt = require("jsonwebtoken");
const { returnError } = require("../helpers");

const { User } = require("../schemas/userSchema");

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer") {
      throw returnError(401, "you are not authorized");
    }

    const payload = jwt.verify(token, SECRET_KEY);
    //console.log(payload);

    const user = await User.findById(payload.user);
    if (!user) {
      throw returnError(401, "no user found");
    }

    next();
  } catch (error) {
    if (!error.status) {
      error.status = 401;
      error.message = "you are not authorized";
    }
    next(error);
  }
};

module.exports = authenticate;

//password jwt npm??
