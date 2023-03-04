const fs = require("fs/promises");
const path = require("path");
const { v4: id } = require("uuid");

const contactsPath = path.join(__dirname, "/contacts.json");

const listContacts = async () => {
  try {
    const contactsList = await fs.readFile(contactsPath, "utf8");
    const parsedContactsList = JSON.parse(contactsList);

    return parsedContactsList;
  } catch (error) {
    return console.log("Something went wrong:", error);
  }
};

const getContactById = async (contactId) => {
  try {
    const contactsList = await fs.readFile(contactsPath, "utf8");
    const parsedContactsList = JSON.parse(contactsList);

    const contactToGet = parsedContactsList.filter(
      ({ id }) => id === contactId.toString()
    );

    // if (contactToGet.length === 0) {
    //   return console.log(`Contact with id: ${contactId} is missing`);
    // }

    return contactToGet;
  } catch (error) {
    return console.log("Something went wrong:", error);
  }
};
//addContact(body) для сохранения контакта в файле contacts.json
const addContact = async (body) => {
  //!!!!!!!!разобраться с body и newContact!!!!!!!!!!
  //return body;
  const newContact = body;
  // return newContact;
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
      //return console.log("The contact with same data already exists");
      return { message: "The contact with same data already exists" };
    }
    if (!nameToAdd && !emailToAdd && !phoneToAdd) {
      console.log(`New contact ${body.name} succesfully added to the list`);
    }

    const updatedContactsList = JSON.stringify([
      ...parsedContactsList,
      newContact,
    ]);

    await fs.writeFile(contactsPath, updatedContactsList, "utf8");

    const contactsListAfterAdding = await fs.readFile(contactsPath, "utf8");
    //console.log(contactsListAfterAdding);
    return JSON.parse(contactsListAfterAdding);
    //return console.table(JSON.parse(contactsListAfterAdding));
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

    //const contactsListAfterRemove = await fs.readFile(contactsPath, "utf8");
    await fs.readFile(contactsPath, "utf8");
    // console.table(JSON.parse(contactsListAfterRemove));
    console.log("Contact deleted");
    return true;
  } catch (error) {
    return console.log("Something went wrong:", error);
  }
};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
