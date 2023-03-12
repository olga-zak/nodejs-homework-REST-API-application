const { removeContact } = require("../services/contactsService");

const removeContactController = async (req, res, next) => {
  const id = req.params.contactId;
  const data = await removeContact(id);
  if (!data) {
    res.status(404).json({ message: "Not found" });

    return;
  }
  res.status(200).json({ message: "contact deleted" });
  next;
};

module.exports = removeContactController;
