const express = require("express");

const router = express.Router();

const controller = require("../../controllers");
const { controllerWrapper } = require("../../helpers");
const validateBody = require("../../validation/validateBody");
const {
  bodySchema,
  bodySchemaForUpdateContact,
  bodySchemaForUpdateContactStatus,
} = require("../../validation/validationSchemas");

const { authenticate } = require("../../middlewares");
// @ GET /api/contacts
// ничего не получает
// вызывает функцию listContacts для работы с json-файлом contacts.json
// возвращает массив всех контактов в json-формате со статусом 200
router.get(
  "/",
  authenticate,
  controllerWrapper(controller.listContactsController)
);

// @ GET /api/contacts/:id
// Не получает body
// Получает параметр id
// вызывает функцию getById для работы с json-файлом contacts.json
// если такой id есть, возвращает объект контакта в json-формате со статусом 200
// если такого id нет, возвращает json с ключом "message": "Not found" и статусом 404
router.get(
  "/:contactId",
  controllerWrapper(controller.getContactByIdController)
);

// @ POST /api/contacts
// Получает body в формате {name, email, phone} (все поля обязательны)
// Если в body нет каких-то обязательных полей, возвращает json с ключом {"message": "missing required name field"} и статусом 400
// Если с body все хорошо, добавляет уникальный идентификатор в объект контакта
// Вызывает функцию addContact(body) для сохранения контакта в файле contacts.json
// По результату работы функции возвращает объект с добавленным id {id, name, email, phone} и статусом 201
router.post(
  "/",
  authenticate,
  validateBody(bodySchema),
  controllerWrapper(controller.addContactController)
);

// @ DELETE /api/contacts/:id
// Не получает body
// Получает параметр id
// вызывает функцию removeContact для работы с json-файлом contacts.json
// если такой id есть, возвращает json формата {"message": "contact deleted"} и статусом 200
// если такого id нет, возвращает json с ключом "message": "Not found" и статусом 404
router.delete(
  "/:contactId",
  controllerWrapper(controller.removeContactController)
);

// @ PUT /api/contacts/:id
// Получает параметр id
// Получает body в json-формате c обновлением любых полей name, email и phone
// Если body нет, возвращает json с ключом {"message": "missing fields"} и статусом 400
// Если с body все хорошо, вызывает функцию updateContact(contactId, body) (напиши ее) для обновления контакта в файле contacts.json
// По результату работы функции возвращает обновленный объект контакта и статусом 200. В противном случае, возвращает json с ключом "message": "Not found" и статусом 404
router.put(
  "/:contactId",
  //есть проверка на то что в боди что-то есть
  //но нет проверки что новые данные отличаются от старых?
  //add unique into bodySchemaForUpdateContact??
  validateBody(bodySchemaForUpdateContact),
  controllerWrapper(controller.updateContactController)
);

// @ PATCH /api/contacts/:contactId/favorite
// Получает параметр contactId
// Получает body в json-формате c обновлением поля favorite
// Если body нет, возвращает json с ключом {"message": "missing field favorite"} и статусом 400
// Если с body все хорошо, вызывает функцию updateStatusContact(contactId, body) (напиши ее) для обновления контакта в базе
// По результату работы функции возвращает обновленный объект контакта и статусом 200. В противном случае, возвращает json с ключом "message": "Not found" и статусом 404
router.patch(
  "/:contactId/favorite",
  validateBody(bodySchemaForUpdateContactStatus),
  controllerWrapper(controller.updateContactStatusController)
);

module.exports = router;
