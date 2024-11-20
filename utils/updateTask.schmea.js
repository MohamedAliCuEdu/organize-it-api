const updateTaskSchmea = {
  type: "object",
  properties: {
    content: {
      type: "string",
      minLength: 1,
      maxLength: 80,
    },
    status: {
      type: "string",
      enum: ["pending", "progress", "completed"],
    },
    checked: {
      type: "boolean",
    },
  },
  additionalProperties: false,
};

module.exports = updateTaskSchmea;
