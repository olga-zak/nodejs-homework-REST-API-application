const { addContact } = require("../services/contactsService");
const { bodyValidation } = require("../validation/validation");

const addContactController = async (req, res, next) => {
  const newContact = req.body;

  const validationInfo = bodyValidation.validate(newContact);
  if (validationInfo.error) {
    res.status(400).json({ message: "missing required name field" });
    return;
  }

  const result = await addContact(newContact);

  res.status(201).json(result);

  next;
};

module.exports = addContactController;
