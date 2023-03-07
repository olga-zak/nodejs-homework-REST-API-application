const express = require("express");
const { v4: id } = require("uuid");

const router = express.Router();

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../controllers/contacts");
const {
  bodyValidation,
  updateContactValidation,
} = require("../../validation/validation");

// @ GET /api/contacts
// ничего не получает
// вызывает функцию listContacts для работы с json-файлом contacts.json
// возвращает массив всех контактов в json-формате со статусом 200
router.get("/", async (_, res) => {
  const data = await listContacts();
  res.status(200).json(data);
});

// @ GET /api/contacts/:id
// Не получает body
// Получает параметр id
// вызывает функцию getById для работы с json-файлом contacts.json
// если такой id есть, возвращает объект контакта в json-формате со статусом 200
// если такого id нет, возвращает json с ключом "message": "Not found" и статусом 404
router.get("/:contactId", async (req, res, next) => {
  const id = req.params.contactId;
  const data = await getContactById(id);

  if (data.length !== 1) {
    return res.status(404).json({ message: "Not found" });
  }

  res.json(data);
  next;
});

// @ POST /api/contacts
// Получает body в формате {name, email, phone} (все поля обязательны)
// Если в body нет каких-то обязательных полей, возвращает json с ключом {"message": "missing required name field"} и статусом 400
// Если с body все хорошо, добавляет уникальный идентификатор в объект контакта
// Вызывает функцию addContact(body) для сохранения контакта в файле contacts.json
// По результату работы функции возвращает объект с добавленным id {id, name, email, phone} и статусом 201
router.post("/", async (req, res, next) => {
  const data = req.body;

  const validationInfo = bodyValidation.validate(data);
  if (validationInfo.error) {
    res.status(400).json({ message: "missing required name field" });
    return;
  }

  const newContact = {
    id: id(),
    name: data.name,
    email: data.email,
    phone: data.phone,
  };

  await addContact(newContact);

  res.status(201).json(newContact);

  next;
});

// @ DELETE /api/contacts/:id
// Не получает body
// Получает параметр id
// вызывает функцию removeContact для работы с json-файлом contacts.json
// если такой id есть, возвращает json формата {"message": "contact deleted"} и статусом 200
// если такого id нет, возвращает json с ключом "message": "Not found" и статусом 404
router.delete("/:contactId", async (req, res, next) => {
  const id = req.params.contactId;
  const data = await removeContact(id);
  if (!data) {
    res.status(404).json({ message: "Not found" });

    return;
  }
  res.status(200).json({ message: "contact deleted" });
  next;
});

// @ PUT /api/contacts/:id
// Получает параметр id
// Получает body в json-формате c обновлением любых полей name, email и phone
// Если body нет, возвращает json с ключом {"message": "missing fields"} и статусом 400
// Если с body все хорошо, вызывает функцию updateContact(contactId, body) (напиши ее) для обновления контакта в файле contacts.json
// По результату работы функции возвращает обновленный объект контакта и статусом 200. В противном случае, возвращает json с ключом "message": "Not found" и статусом 404
router.put("/:contactId", async (req, res, next) => {
  const id = req.params.contactId;
  const body = req.body;

  const validationInfo = updateContactValidation.validate(body);

  if (validationInfo.error) {
    res.status(400).json({ message: "missing fields" });
    return;
  }

  const data = await updateContact(id, body);

  if (!data) {
    res.status(404).json({ message: "Not found" });
    return;
  }
  res.status(200).json(data);
  next;
});

module.exports = router;
