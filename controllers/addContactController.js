const { addContact } = require("../services/contactsService");

const addContactController = async (req, res, next) => {
  const newContact = req.body;

  const result = await addContact(newContact);

  res.status(201).json(result);
};

module.exports = addContactController;
