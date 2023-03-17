const { removeContact } = require("../services/contactsService");
const { returnError } = require("../helpers");

const removeContactController = async (req, res, next) => {
  const id = req.params.contactId;
  const data = await removeContact(id);
  if (!data) {
    throw returnError(404, `Contact with id ${id} doesn't exist`);
  }
  res.status(200).json({ message: `Contact with id ${id} is deleted` });
};

module.exports = removeContactController;
