const express = require("express");
const router = express.Router();
const User = require("../models/User");
const ROLES = require('../config/roles');

const verifyMWToken = require("../middlewares/verifyMWToken");
const verifyMWPermissions = require("./verifyMWPermissions");
const idMWValidator = require("../middlewares/idMWValidator");

router.param("id", idMWValidator)
router.get(
  "/:id",
  verifyMWToken,
  verifyMWPermissions(ROLES.Admin),
  async (req, res) => {
    try {
      // 1. find user:
      let foundUser = await User.findById(req.id).exec();
      if (!foundUser) return res.sendStatus(404);
      // 2. add roles:
      foundUser.roles.Editor = ROLES.Editor;
      let result = await foundUser.save();
      res.json(result);
    } catch (err) {
      res.status(400).json({ errMsg: err.message });
    }
  }
);

module.exports = router
