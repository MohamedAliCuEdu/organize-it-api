const jwt = require("jsonwebtoken");
const EXPIRES_LIST = require("../config/expires_list");

// generate access & refreshToken
// then retern them in object
module.exports = function genTokens(payload) {
  const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET_TOKEN, {
    expiresIn: EXPIRES_LIST.accessToken,
  });
  const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET_TOKEN, {
    expiresIn: EXPIRES_LIST.refreshToken,
  });

  return { accessToken, refreshToken };
};
