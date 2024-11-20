const noteSchmea = {
  type: "object",
  properties: {
    title: {
      type: "string",
      maxLength: 20,
    },
    content: {
      type: "string",
      minLength: 1,
      maxLength: 1500,
    },
    tags: {
      type: "array",
      items: { type: "string", minLength: 1, maxLength: 10 },
      maxItems: 5,
      uniqueItems: true,
    },
  },
  required: ["content"],
  additionalProperties: false,
};

module.exports = noteSchmea;
