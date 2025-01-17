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
    avatarURL: {
      type: String,
      required: true,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
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
  //email: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  // subscription: Joi.string().default("starter"),
  // token: Joi.string().default(null),
});

const loginUserJoiSchema = Joi.object({
  //email: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().required(),
});

const resendVerifEmailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
});

const schemas = {
  registerUserJoiSchema,
  loginUserJoiSchema,
  resendVerifEmailSchema,
};

const User = model("user", userSchema);

module.exports = { User, schemas };
