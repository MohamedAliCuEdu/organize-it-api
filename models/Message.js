const mongoose = require("mongoose");
const REGEX = require("../config/regex");

const Schema = mongoose.Schema;

const messageSchema = new Schema(
  {
    username: {
      type: String,
      default: "unkown",
    },
    userId: {
      type: String,
      match: REGEX.OBJECT_ID,
      default: "000000000000000000000000"
    },
    content: {
      type: String,
      minlength: 1,
      maxlength: 1500,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);
