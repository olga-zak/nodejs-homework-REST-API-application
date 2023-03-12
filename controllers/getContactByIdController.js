const { getContactById } = require("../services/contactsService");
const { returnError } = require("../helpers");

const getContactByIdController = async (req, res, next) => {
  const id = req.params.contactId;
  const data = await getContactById(id);

  if (data.length !== 1) {
    throw returnError(404, `Contact with id ${id} doesn't exist`);
  }

  res.json(data);
};

module.exports = getContactByIdController;
