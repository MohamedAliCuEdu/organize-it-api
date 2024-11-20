const express = require("express");
const authController = require("../controllers/auth.controller");
const validateMW = require("../middlewares/validateMW");
const userAuthSchema = require("../utils/userAuth.schema");

const router = express.Router();

// 1) user log in:
router.post("/", validateMW(userAuthSchema), authController.userLogin);
// 2) user log out:
router.get("/logout", authController.userLogout);
// 3) refresh token:
router.get("/refresh", authController.updateRefreshToken);

module.exports = router;
