// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;
const { Schema, model } = require("mongoose");

const contactSchema = new Schema({
  name: String,
  email: String,
  phone: String,
  favorite: Boolean,
  // name: {
  //   type: String,
  //   // required: [true, "Set name for contact"],
  //   // unique: true,
  // },
  // email: {
  //   type: String,
  //   // unique: true,
  // },
  // phone: {
  //   type: String,
  //   // unique: true,
  // },
  // favorite: {
  //   type: Boolean,
  // },
});

const Contact = model("contact", contactSchema);

module.exports = Contact;
