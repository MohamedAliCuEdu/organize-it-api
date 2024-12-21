const asyncFunction = require("./asyncFunction");
const Ajv = require('ajv').default;

const validateMW = (schema) =>
  asyncFunction(async (req, res, nxt) => {
    // 1. validte req.body:
    const ajv = new Ajv();
    let isValid = ajv.validate(schema, req.body);
    if (!isValid) {
      return res.status(400).json({ errMsg: "invalid data!" });
    }
    // 2. set req.valid = 1:
    req.valid = 1;
    nxt();
  });
module.exports = validateMW;
