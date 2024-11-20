const messageSchema = {
  type: "object",
  properties: {
    author: {
      type: "boolean",
    },
    content: {
      type: "string",
      minLength: 1,
      maxLength: 1500,
    },
  },
  required: ["author", "content"],
  additionalProperties: false,
}; 

module.exports = messageSchema;
