const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleSchemaValidationErrors } = require("../helpers");

const emailRegexp = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;

//===========mongoose Schema===========//
const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      //default: null,
      default: "",
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
  password: Joi.string().required(),
  email: Joi.string().required(),
  //email: Joi.string().pattern(emailRegexp).required(), //+unique
  // subscription: Joi.string().default("starter"),
  // token: Joi.string().default(null),
});

const loginUserJoiSchema = Joi.object({
  email: Joi.string().required(),
  // email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().required(),
});

const schemas = {
  registerUserJoiSchema,
  loginUserJoiSchema,
};

const User = model("user", userSchema);

module.exports = { User, schemas }; //3.2 lesson 57:55 если запутаюсь с импортом
