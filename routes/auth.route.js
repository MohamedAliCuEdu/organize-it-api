const express = require("express");
const authController = require("../controllers/auth.controller");
const validateMW = require("../middlewares/validateMW");
const userAuthSchema = require("../utils/userAuth.schema");
const objectIdMWValidator = require("../middlewares/objectIdMWValidator");
const verifyMWToken = require("../middlewares/verifyMWToken");

const router = express.Router();
// validate params:
router.param("userId", objectIdMWValidator("userId"));
// 1) user log in:
router.post("/", validateMW(userAuthSchema), authController.userLogin);
// 2) change username:
router.patch(
  "/change-username/:userId",
  verifyMWToken,
  validateMW(userAuthSchema),
  authController.changeUsername
);
// 3) change password:
router.patch(
  "/change-password/:userId",
  verifyMWToken,
  authController.changePassword
);
// 4) refresh token:
router.get("/refresh", authController.updateRefreshToken);
// 5) user log out:
router.get("/logout", authController.userLogout);

module.exports = router;
