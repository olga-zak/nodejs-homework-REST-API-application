const { addContact } = require("../services/contactsService");
const { bodyValidation } = require("../validation/validation");
const { returnError } = require("../helpers");

const addContactController = async (req, res, next) => {
  const newContact = req.body;

  const validationInfo = bodyValidation.validate(newContact);
  if (validationInfo.error) {
    // res.status(400).json({ message: "missing required name field" });
    // return;
    throw returnError(400, "Missing some of required fields");
  }

  const result = await addContact(newContact);

  res.status(201).json(result);

  next;
};

module.exports = addContactController;
