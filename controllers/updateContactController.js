const { updateContact } = require("../services/contactsService");

const { updateContactValidation } = require("../validation/validation");

const updateContactController = async (req, res, next) => {
  const id = req.params.contactId;
  const body = req.body;

  const validationInfo = updateContactValidation.validate(body);

  if (validationInfo.error) {
    res.status(400).json({ message: "missing fields" });
    return;
  }

  const data = await updateContact(id, body);

  if (!data) {
    res.status(404).json({ message: "Not found" });
    return;
  }
  res.status(200).json(data);
  next;
};

module.exports = updateContactController;
