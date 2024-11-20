module.exports = (allowedRoles) => {
  return async (req, res, nxt) => {
    try {
      // 1. check roles:
      let roles = req?.roles;
      // 2. check if user have permissions:
      let userPermission = roles
      .map((role) => allowedRoles.includes(role))
      .find((val) => val === true);
      console.log(roles);
      if (!userPermission) return res.sendStatus(401);
      console.log(roles);
      nxt();
    } catch (err) {
      res.status(500).json(`Error from verifyMWPermissions: ${err.message}`);
    }
  };
};
