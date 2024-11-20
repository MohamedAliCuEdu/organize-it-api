const REGEX = require("../config/regex");

const userAuthSchema = {
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
  },
  required: ["username", "password"],
  additionalProperties: false,
};

module.exports = userAuthSchema;
