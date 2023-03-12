const { updateContact } = require("../services/contactsService");
const { returnError } = require("../helpers");
const { updateContactValidation } = require("../validation/validation");

const updateContactController = async (req, res, next) => {
  const id = req.params.contactId;
  const body = req.body;
  //есть проверка на то что в боди что-то есть
  //но нет проверки что новые данные отличаются от старых?
  const validationInfo = updateContactValidation.validate(body);

  if (validationInfo.error) {
    // res.status(400).json({ message: "missing fields" });
    // return;
    throw returnError(400, "Some of the fields should be filled");
  }

  const data = await updateContact(id, body);

  if (!data) {
    // res.status(404).json({ message: "Not found" });
    // return;
    throw returnError(404, "Not found");
  }
  res.status(200).json(data);
  next;
};

module.exports = updateContactController;
