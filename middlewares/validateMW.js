const asyncFunction = require("./asyncFunction");
const Ajv = require('ajv').default;

const validateMW = (schema) =>
  asyncFunction(async (req, res, nxt) => {
    // 1. validte req.body:
    const ajv = new Ajv();
    console.log(req.body)
    let isValid = ajv.validate(schema, req.body);
    if (!isValid) {
      console.log(ajv.errors);
      return res.status(403).json({ errMsg: "invalid data!" });
    }
    // 2. set req.valid = 1:
    req.valid = 1;
    nxt();
  });
module.exports = validateMW;
