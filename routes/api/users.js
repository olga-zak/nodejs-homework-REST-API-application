const express = require("express");

const router = express.Router();

const validateBody = require("../../validation/validateBody");
const { schemas } = require("../../schemas/userSchema");
const { controllerWrapper } = require("../../helpers");
const controller = require("../../controllers/users");
const { authenticate, upload } = require("../../middlewares");

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

// Логаут
// Создайте ендпоинт /users/logout
// Добавьте в маршрут мидлвар проверки токена.
// В модели User найти пользователя по _id.
// Если пользователя не существует вернуть Ошибку Unauthorized.
// В противном случае, удалить токен в текущем юзере и вернуть Успешный ответ.
router.post("/logout", authenticate, controllerWrapper(controller.logout));

// Текущий пользователь - получить данные юзера по токену
// Создайте эндпоинт /users/current
// Добавьте в маршрут мидлвар проверки токена.
// Если пользователя не существует вернуть Ошибку Unauthorized
// В противном случае вернуть Успешный ответ
router.get(
  "/current",
  authenticate,
  controllerWrapper(controller.getCurrentUser)
);

//Добавь возможность обновления аватарки, создав эндпоинт /users/avatars и используя метод PATCH
router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  controllerWrapper(controller.updateUserAvatar)
);

// создать эндпоинт GET /users/verify/:verificationToken, где по параметру verificationToken мы будем искать пользователя в модели User
// если пользователь с таким токеном не найден, необходимо вернуть Ошибку 'Not Found'
// если пользователь найден - устанавливаем verificationToken в null, а поле verify ставим равным true в документе пользователя и возвращаем Успешный ответ
router.get(
  "/verify/:verificationToken",
  controllerWrapper(controller.verifyEmail)
);

// POST /users/verify/
// Получает body в формате { email }
// Если в body нет обязательного поля email, возвращает json с ключом {"message": "missing required field email"} и статусом 400
// Если с body все хорошо, выполняем повторную отправку письма с verificationToken на указанный email, но только если пользователь не верифицирован
// Если пользователь уже прошел верификацию отправить json с ключом { message: "Verification has already been passed"} со статусом 400 Bad Request
router.post(
  "/verify",
  validateBody(schemas.resendVerifEmailSchema),
  controllerWrapper(controller.resendVerifEmail)
);

module.exports = router;
