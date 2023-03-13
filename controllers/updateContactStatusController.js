const { updateStatusContact } = require("../services/contactsService");
const { returnError } = require("../helpers");

const updateContactStatusController = async (req, res, next) => {
  const id = req.params.contactId;
  const body = req.body;

  const data = await updateStatusContact(id, body);
  if (!data) {
    throw returnError(404, "3Not found");
  }
  res.status(200).json(data);
  next;
};

module.exports = updateContactStatusController;
