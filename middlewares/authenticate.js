const jwt = require("jsonwebtoken");
const { returnError } = require("../helpers");

const { User } = require("../schemas/userSchema");

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer") {
      throw returnError(401, "Not authorized - no Bearer");
    }

    const payload = jwt.verify(token, SECRET_KEY);
    //если ок, то возвращает payload (напр. создавали его в login.js - там payload - id)
    console.log(payload); //{ user: '641114ca704a4845d824d892', iat: 1678844517, exp: 1678930917 }
    //если не ок(не верифицирован) - выбрасывает ошибку, но в ней ни error.status, ни error.message
    //в catch добавляем условие

    const user = await User.findById(payload.id);

    if (!user) {
      throw returnError(401, "Not authorized - no user found");
    }
    //Если пользователь существует и токен совпадает с тем, что находится в базе, записать его данные в req.user и вызвать методnext().
    next();
  } catch (error) {
    if (!error.status) {
      error.status = 401;
      error.message = "Not authorized - token not valid";
    }
    next(error);
  }
};

module.exports = authenticate;

//password jwt npm??