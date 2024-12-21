const { OBJECT_ID } = require("../config/regex");
const asyncFunction = require("./asyncFunction");

const objectIdMWValidator = (idName) =>
  asyncFunction(async (req, res, nxt, val) => {
    // 1. check id value:
    if (!OBJECT_ID.test(val))
      return res
        .status(403)
        .json({ errMsg: `${idName} invalid or not found!` });
    // 2. set req.id to id:
    req[idName] = val;
    nxt();
  });

module.exports = objectIdMWValidator;
