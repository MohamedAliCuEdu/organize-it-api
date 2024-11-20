const mongoose = require("mongoose");
const REGEX = require("../config/regex");

const Schema = mongoose.Schema;

const taskSchema = new Schema(
  {
    content: {
      type: String,
      minLength: 1,
      maxLength: 80,
      require: true,
    },
    status: {
      type: String,
      enum: ["pending","progress", "completed"],
      default: "pending",
      require: true,
    },
    checked: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: String,
      match: REGEX.OBJECT_ID,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tasks", taskSchema);
