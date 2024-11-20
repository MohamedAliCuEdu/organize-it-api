const REGEX = require("../config/regex");

const userInfoSchema = {
  type: "object",
  properties: {
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
      pattern: REGEX.BIRTH_DATE.source,
    },
    country: {
      type: "string",
      pattern: REGEX.COUNTRY.source,
    },
    address: {
      type: "string",
      minLength: 1,
      maxLength: 100,
    },
    education: {
      type: "string",
      minLength: 1,
      maxLength: 70,
      pattern: REGEX.EDUCATION.source,
    },
  },
  required: [
    "fname",
    "lname",
    "gender",
    "birthDate",
    "country",
  ],
  additionalProperties: false,
};

module.exports = userInfoSchema;
