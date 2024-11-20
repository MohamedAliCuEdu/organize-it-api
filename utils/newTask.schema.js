const newTaskSchmea = {
  type: "object",
  properties: {
    content: {
      type: "string",
      minLength: 1,
      maxLength: 80,
    }
  },
  required: ["content"],
  additionalProperties: false,
};

module.exports = newTaskSchmea;
