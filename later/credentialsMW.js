const allowedOrigins = require("../config/allowedOrigins");

function credentialsMW(req, res, nxt) {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Credentials", true);
  }
  nxt();
}

module.exports = credentialsMW;
