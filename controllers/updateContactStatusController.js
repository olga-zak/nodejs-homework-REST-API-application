const { updateStatusContact } = require("../services/contactsService");
const { updateStatusContactValidation } = require("../validation/validation");

const updateContactStatusController = async (req, res, next) => {
  const id = req.params.contactId;
  const body = req.body;

  const validationInfo = updateStatusContactValidation.validate(body);
  console.log(validationInfo);

  if (validationInfo.error) {
    res.status(400).json({ message: "missing field favorite" });
    return;
  }

  const data = await updateStatusContact(id, body);
  if (!data) {
    res.status(404).json({ message: "Not found" });
    return;
  }
  res.status(200).json(data);
  next;
};

module.exports = updateContactStatusController;
