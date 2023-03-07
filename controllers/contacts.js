const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "/contacts.json");

const listContacts = async () => {
  try {
    const contactsList = await fs.readFile(contactsPath, "utf8");
    const parsedContactsList = JSON.parse(contactsList);

    return parsedContactsList;
  } catch (error) {
    console.log("Something went wrong:", error);
    return { message: "Something went wrong" };
  }
};

const getContactById = async (contactId) => {
  try {
    const contactsList = await fs.readFile(contactsPath, "utf8");
    const parsedContactsList = JSON.parse(contactsList);

    const contactToGet = parsedContactsList.filter(
      ({ id }) => id === contactId.toString()
    );

    return contactToGet;
  } catch (error) {
    console.log("Something went wrong:", error);
    return { message: "Something went wrong" };
  }
};

const addContact = async (body) => {
  try {
    const contactsList = await fs.readFile(contactsPath, "utf8");
    const parsedContactsList = JSON.parse(contactsList);

    const nameToAdd = parsedContactsList.find(
      (contact) => contact.name.toLowerCase() === body.name.toLowerCase()
    );
    const emailToAdd = parsedContactsList.find(
      (contact) => contact.email.toLowerCase() === body.email.toLowerCase()
    );
    const phoneToAdd = parsedContactsList.find(
      (contact) => contact.phone === body.phone
    );

    if (nameToAdd || emailToAdd || phoneToAdd) {
      console.log("The contact with same data already exists");
      return { message: "The contact with same data already exists" };
    }
    if (!nameToAdd && !emailToAdd && !phoneToAdd) {
      console.log(`New contact ${body.name} succesfully added to the list`);
    }

    const updatedContactsList = JSON.stringify([...parsedContactsList, body]);

    await fs.writeFile(contactsPath, updatedContactsList, "utf8");
    return;
  } catch (error) {
    console.log("Something went wrong:", error);
    return { message: "Something went wrong" };
  }
};

const removeContact = async (contactId) => {
  try {
    const contactsList = await fs.readFile(contactsPath, "utf8");
    const parsedContactsList = JSON.parse(contactsList);

    const updatedContactsList = parsedContactsList.filter(
      ({ id }) => id !== contactId.toString()
    );

    if (parsedContactsList.length === updatedContactsList.length) {
      console.log(`Contact with id ${contactId} is missing in list`);
      return false;
    }

    await fs.writeFile(
      contactsPath,
      JSON.stringify(updatedContactsList),
      "utf8"
    );

    await fs.readFile(contactsPath, "utf8");

    console.log("Contact deleted");
    return true;
  } catch (error) {
    console.log("Something went wrong:", error);
    return { message: "Something went wrong" };
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contactsList = await fs.readFile(contactsPath, "utf8");
    const parsedContactsList = JSON.parse(contactsList);

    const contactToUpdateIndex = parsedContactsList.findIndex(
      ({ id }) => id === contactId.toString()
    );

    if (contactToUpdateIndex < 0) {
      console.log(`The is no contact with id ${contactId}`);
      return false;
    }

    const contactToUpdate = parsedContactsList[contactToUpdateIndex];

    parsedContactsList[contactToUpdateIndex] = { ...contactToUpdate, ...body };

    await fs.writeFile(
      contactsPath,
      JSON.stringify(parsedContactsList),
      "utf8"
    );

    return parsedContactsList[contactToUpdateIndex];
  } catch (error) {
    console.log("Something went wrong:", error);
    return { message: "Something went wrong" };
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
