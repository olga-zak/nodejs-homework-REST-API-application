const Contact = require("./contactSchema");

const listContacts = async (owner, page, limit) => {
  const skip = (page - 1) * limit;
  return await Contact.find({ owner }, "-createdAt -updatedAt", {
    skip, //сколько пропустить элементов
    limit, //сколько извлечь элементов
  }).populate("owner", "email subscription");
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
