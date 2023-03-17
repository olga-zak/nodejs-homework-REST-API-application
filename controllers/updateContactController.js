const { updateContact } = require("../services/contactsService");
const { returnError } = require("../helpers");

const updateContactController = async (req, res, next) => {
  const id = req.params.contactId;
  const body = req.body;

  const data = await updateContact(id, body);

  if (!data) {
    throw returnError(404, "2Not found");
  }
  res.status(200).json(data);
};

module.exports = updateContactController;
