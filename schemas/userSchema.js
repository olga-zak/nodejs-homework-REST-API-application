const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleSchemaValidationErrors } = require("../helpers");

const emailRegexp = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;

//===========mongoose Schema===========//
const userSchema = new Schema(
  {
    name: {
      type: String,
      //required: true,
      required: [true, "Contact name should exist"],
    },
    email: {
      type: String,
      //match: emailRegexp,
      //unique: true, //4.1 lesson 22:55 //3.2 lesson 1:24
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

//===========================//
//func кот. отлавливает ошибки при валидации -> передаём её схеме
userSchema.post("save", handleSchemaValidationErrors);
//===========================//

//===========joi Schema===========//
const registerUserJoiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  //email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().required(),
});

const loginUserJoiSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().required(),
});

const schemas = {
  registerUserJoiSchema,
  loginUserJoiSchema,
};

const User = model("user", userSchema);

module.exports = { User, schemas }; //3.2 lesson 57:55 если запутаюсь с импортом
