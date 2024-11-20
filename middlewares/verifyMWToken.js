const jwt = require("jsonwebtoken");
const asyncFunction = require("./asyncFunction");

const verifyMWToken = asyncFunction(async (req, res, nxt) => {
  // 1. get accessToken:
  let accessToken = req.headers?.authentication;
  if (!accessToken) return res.status(401).json({ errMsg: "token not found!" });
  // 2. verify token:
  jwt.verify(accessToken, process.env.ACCESS_SECRET_TOKEN, (err, decoded) => {
    if (err) {
      return res.status(403).json({ errMsg: "invalid access token!" });
    }
    // 3. store roles in request:
    req.roles = decoded.roles;
    nxt();
  });
});
module.exports = verifyMWToken;
