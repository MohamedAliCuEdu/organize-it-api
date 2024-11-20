const REGEX = require("../config/regex");

const userInterestsSchema = {
  type: "object",
  properties: {
    avatarColor: {
      type: "string",
      pattern: REGEX.HEX_COLOR.source,
    },
    bannerUrl: {
      type: "string",
      minLength: 1,
      maxLength: 70,
    },
    quote: {
      type: "string",
      maxLength: 70,
    },
    favHobbies: {
      type: "array",
      maxItems: 10,
      items: {
        type: "string",
        minLength: 1,
        maxLength: 50,
      },
      uniqueItems: true,
    },
    favFoods: {
      type: "array",
      maxItems: 10,
      items: {
        type: "string",
        minLength: 1,
        maxLength: 50,
      },
      uniqueItems: true,
    },
    favDrinks: {
      type: "array",
      maxItems: 10,
      items: {
        type: "string",
        minLength: 1,
        maxLength: 50,
      },
      uniqueItems: true,
    },
    favMovies: {
      type: "array",
      maxItems: 10,
      items: {
        type: "string",
        minLength: 1,
        maxLength: 50,
      },
      uniqueItems: true,
    },
    favSongs: {
      type: "array",
      maxItems: 10,
      items: {
        type: "string",
        minLength: 1,
        maxLength: 50,
      },
      uniqueItems: true,
    },
  },
  additionalProperties: false,
};

module.exports = userInterestsSchema;
