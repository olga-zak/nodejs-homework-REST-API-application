const { addContact } = require("../services/contactsService");

const addContactController = async (req, res, next) => {
  console.log(req.user);
  const { _id: owner } = req.user;
  const newContact = req.body;

  const result = await addContact({ ...newContact, owner });

  res.status(201).json(result);
};

module.exports = addContactController;
