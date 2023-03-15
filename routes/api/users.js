const express = require("express");

const router = express.Router();

const validateBody = require("../../validation/validateBody");
const { schemas } = require("../../schemas/userSchema");
const { controllerWrapper } = require("../../helpers");
const controller = require("../../controllers/users");

// Регистрация
//@ POST api/users/register
// Создайте эндпоинт /users/register
//===Получает body в формате {email, password}
// Сделать валидацию всех обязательных полей (email и password). При ошибке валидации вернуть Ошибку валидации.
// В случае успешной валидации в модели User создать пользователя по данным которые прошли валидацию. Для засолки паролей используй bcrypt или bcryptjs
// Если почта уже используется кем-то другим, вернуть Ошибку Conflict.
// В противном случае вернуть Успешный ответ.

router.post(
  "/register",
  validateBody(schemas.registerUserJoiSchema),
  controllerWrapper(controller.register)
);

// Логин
//@ POST api/users/login
// Создайте эндпоинт /users/login
// В модели User найти пользователя по email.
// Сделать валидацию всех обязательных полей (email и password). При ошибке валидации вернуть Ошибку валидации.
// В противном случае, сравнить пароль для найденного юзера, если пароли совпадают создать токен, сохранить в текущем юзере и вернуть Успешный ответ.
// Если пароль или email неверный, вернуть Ошибку Unauthorized.
router.post(
  "/login",
  validateBody(schemas.loginUserJoiSchema),
  controllerWrapper(controller.login)
);
module.exports = router;
