const { OBJECT_ID } = require("../config/regex");

const objectIdMWValidator = (idName) => async (req, res, nxt, val) => {
  try {
    // 1. check id value:
    if (!OBJECT_ID.test(val))
      return res.status(403).json({ errMsg: `${idName} invalid or not found` });
    // 2. set req.id to id:
    req[idName] = val;
    nxt();
  } catch (err) {
    res
      .status(500)
      .json({ errMsg: `Error - from objectIdValidator: ${err.message}` });
  }
};

module.exports = objectIdMWValidator;
