const listContactsController = require("./listContactsController");
const getContactByIdController = require("./getContactByIdController");
const addContactController = require("./addContactController");
const removeContactController = require("./removeContactController");
const updateContactController = require("./updateContactController");
const updateContactStatusController = require("./updateContactStatusController");

module.exports = {
  listContactsController,
  getContactByIdController,
  addContactController,
  removeContactController,
  updateContactController,
  updateContactStatusController,
};
