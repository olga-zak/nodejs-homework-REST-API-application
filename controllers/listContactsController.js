const { listContacts } = require("../services/contactsService");

const listContactsController = async (req, res) => {
  const { _id: owner } = req.user;

  const data = await listContacts(owner);
  res.status(200).json(data);
};

module.exports = listContactsController;
