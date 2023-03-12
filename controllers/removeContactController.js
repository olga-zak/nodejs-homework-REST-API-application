const { removeContact } = require("../services/contactsService");
const { returnError } = require("../helpers");

const removeContactController = async (req, res, next) => {
  const id = req.params.contactId;
  const data = await removeContact(id);
  if (!data) {
    // res.status(404).json({ message: "Not found" });
    // return;
    throw returnError(404, `Contact with id ${id} doesn't exist`);
  }
  res.status(200).json({ message: `Contact with id ${id} is deleted` });
  next;
};

module.exports = removeContactController;
