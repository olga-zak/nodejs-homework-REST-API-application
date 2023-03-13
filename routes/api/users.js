const express = require("express");

const router = express.Router();

const validateBody = require("../../validation/validateBody");
const { schemas } = require("../../schemas/userSchema");
const { controllerWrapper } = require("../../helpers");
const controller = require("../../controllers/users");

// Регистрация
//@ POST api/users/register
// Создайте эндпоинт /users/register
// Сделать валидацию всех обязательных полей (email и password). При ошибке валидации вернуть Ошибку валидации.
// В случае успешной валидации в модели User создать пользователя по данным которые прошли валидацию. Для засолки паролей используй bcrypt или bcryptjs
// Если почта уже используется кем-то другим, вернуть Ошибку Conflict.
// В противном случае вернуть Успешный ответ.
router.post(
  "/register",
  validateBody(schemas.registerUserJoiSchema),
  controllerWrapper(controller.register)
);

module.exports = router;
