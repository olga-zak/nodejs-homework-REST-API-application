const Contact = require("./contactSchema");

const listContacts = async (owner) => {
  return await Contact.find({ owner });
};

const getContactById = async (contactId) => {
  return await Contact.find({ _id: contactId });
};

const addContact = async (body) => {
  return await Contact.create(body);
};

const removeContact = async (contactId) => {
  return await Contact.findByIdAndDelete({ _id: contactId });
};

const updateContact = async (contactId, body) => {
  return await Contact.findByIdAndUpdate({ _id: contactId }, body, {
    new: true,
  });
};

const updateStatusContact = async (contactId, body) => {
  return await Contact.findByIdAndUpdate({ _id: contactId }, body, {
    new: true,
  });
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
};
