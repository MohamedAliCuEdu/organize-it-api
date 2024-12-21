const asyncFunction = require("./asyncFunction");

const verifyMWPermissions = (allowedRoles) =>
  asyncFunction(async (req, res, nxt) => {
    // 1. check roles:
    let roles = req?.roles;
    // 2. check if user have permissions:
    let userPermission = roles
      .map((role) => allowedRoles.includes(role))
      .find((val) => val === true);
    if (!userPermission) return res.sendStatus(401);
    nxt();
  });

module.exports = verifyMWPermissions;
