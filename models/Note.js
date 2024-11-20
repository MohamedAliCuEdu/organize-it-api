const mongoose = require("mongoose");
const { OBJECT_ID } = require("../config/regex");

const Schema = mongoose.Schema;

const noteSchema = new Schema(
  {
    title: {
      type: String,
      maxlength: 20,
    },
    content: {
      type: String,
      minlength: 1,
      maxlength: 1500,
      require: true,
    },
    tags: {
      type: [String],
      maxlength: 5,
      validate: [
        {
          validator: function (tags) {
            return new Set(tags).size === tags.length;
          },
          message: "tags must be unique!",
        },
        {
          validator: function (values) {
            return values.every((e) => e.length >= 1 && e.length <= 10);
          },
          message: "tag`s name must be between 1 and 10 characters!",
        },
      ],
      default: [],
    },
    userId: {
      type: String,
      match: OBJECT_ID,
      require: true,
    },
    isArchived: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Note", noteSchema);
