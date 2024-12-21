const mongoose = require("mongoose");
const REGEX = require("../config/regex");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      lowercase: true,
      match: REGEX.USERNAME,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    fname: {
      type: String,
      lowercase: true,
      trim: true,
      match: REGEX.NAME,
      required: true,
    },
    lname: {
      type: String,
      lowercase: true,
      trim: true,
      match: REGEX.NAME,
      required: true,
    },
    pw: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: true,
    },
    birthDate: {
      type: Date,
      match: REGEX.BIRTH_DATE,
      required: true,
    },
    country: {
      type: String,
      match: REGEX.COUNTRY,
    },
    address: {
      type: String,
      minlength: 1,
      maxlength: 100,
    },
    education: {
      type: String,
      minLength: 1,
      maxLength: 70,
    },
    quote: {
      type: String,
      maxlength: 70,
    },
    avatarColor: { type: String, match: REGEX.HEX_COLOR },
    bannerUrl: String,
    favourites: {
      favHobbies: {
        type: [String],
        maxlength: 10,
        validate: [
          {
            validator: function (values) {
              return new Set(values).size === values.length;
            },
            message: '"hobbies\'s name" has been added before!',
          },
          {
            validator: function (values) {
              return values.every((e) => e.length >= 1 && e.length <= 50);
            },
            message: '"hobbie\'s name" must be between 1 and 50 characters!',
          },
        ],
        set: function (values) {
          return values.map((val) => val.toLowerCase());
        },
        default: [],
      },
      favFoods: {
        type: [String],
        maxlength: 10,
        validate: [
          {
            validator: function (values) {
              return new Set(values).size === values.length;
            },
            message: '"food\'s name" has been added before!',
          },
          {
            validator: function (values) {
              return values.every((e) => e.length >= 1 && e.length <= 50);
            },
            message: '"food\'s name" must be between 1 and 50 characters!',
          },
        ],
        set: function (values) {
          return values.map((val) => val.toLowerCase());
        },
        default: [],
      },
      favDrinks: {
        type: [String],
        maxlength: 10,
        validate: [
          {
            validator: function (values) {
              return new Set(values).size === values.length;
            },
            message: '"drinks\'s name" has been added before!',
          },
          {
            validator: function (values) {
              return values.every((e) => e.length >= 1 && e.length <= 50);
            },
            message: '"drinks\'s name" must be between 1 and 50 characters!',
          },
        ],
        set: function (values) {
          return values.map((val) => val.toLowerCase());
        },
        default: [],
      },
      favMovies: {
        type: [String],
        maxlength: 10,
        validate: [
          {
            validator: function (values) {
              return new Set(values).size === values.length;
            },
            message: '"movie\'s name" has been added before!',
          },
          {
            validator: function (values) {
              return values.every((e) => e.length >= 1 && e.length <= 50);
            },
            message: '"movie\'s name" must be between 1 and 50 characters!',
          },
        ],
        set: function (values) {
          return values.map((val) => val.toLowerCase());
        },
        default: [],
      },
      favSongs: {
        type: [String],
        maxlength: 10,
        validate: [
          {
            validator: function (values) {
              return new Set(values).size === values.length;
            },
            message: '"song\'s name" has been added before!',
          },
          {
            validator: function (values) {
              return values.every((e) => e.length >= 1 && e.length <= 50);
            },
            message: '"song\'s name" must be between 1 and 50 characters!',
          },
        ],
        set: function (values) {
          return values.map((val) => val.toLowerCase());
        },
        default: [],
      },
    },
    roles: {
      user: {
        type: Number,
        default: 2001,
      },
      editor: {
        type: Number,
        default: 0,
      },
      admin: {
        type: Number,
        default: 0,
      },
    },
    refreshToken: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Users", userSchema);
