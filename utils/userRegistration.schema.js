const REGEX = require("../config/regex");

const userRegistrationSchema = {
  type: "object",
  properties: {
    username: {
      type: "string",
      pattern: REGEX.USERNAME.source,
    },
    password: {
      type: "string",
      pattern: REGEX.PASSWORD.source,
    },
    fname: {
      type: "string",
      pattern: REGEX.NAME.source,
    },
    lname: {
      type: "string",
      pattern: REGEX.NAME.source,
    },
    gender: {
      type: "string",
      enum: ["male", "female"],
    },
    birthDate: {
      type: "string",
      pattern: REGEX.BIRTH_DATE.sourse,
    },
  },
  required: [
    "username",
    "password",
    "fname",
    "lname",
    "gender",
    "birthDate",
  ],
  additionalProperties: false,
};

module.exports = userRegistrationSchema;
