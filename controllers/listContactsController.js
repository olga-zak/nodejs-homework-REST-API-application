const { listContacts } = require("../services/contactsService");

const listContactsController = async (req, res) => {
  const { _id: owner } = req.user;
  //console.log(req.query);
  const { page = 1, limit = 10 } = req.query;
  const data = await listContacts(owner, page, limit);
  res.status(200).json(data);
};

module.exports = listContactsController;
