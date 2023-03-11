const { listContacts } = require("../services/contactsService");

const listContactsController = async (_, res) => {
  const data = await listContacts();
  res.status(200).json(data);
};

module.exports = listContactsController;
