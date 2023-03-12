const { Schema, model } = require("mongoose");

const { requestError } = require("../helpers");

const emailRegexp = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      //match: emailRegexp,
      //unique: true,
      required: true,
    },
    password: {
      type: String,
      // minlength: 6,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);
