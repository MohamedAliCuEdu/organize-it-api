const router = require("express").Router();
const ROLES = require("../config/roles");
const userController = require("../controllers/user.controller");
// middlewares:
const validateMW = require("../middlewares/validateMW");
const objectIdMWValidator = require("../middlewares/objectIdMWValidator");
const verifyMWToken = require("../middlewares/verifyMWToken");
const verifyMWPermissions = require("../middlewares/verifyMWPermissions");
// schema:
const userRegistrationSchema = require("../utils/userRegistration.schema");
const userInfoSchema = require("../utils/userInfo.schema");
const userInterestsSchema = require("../utils/userInterests.schema");

// validate id param:
router.param("userId", objectIdMWValidator("userId"));
// 1) new user registeration:
router.post(
  "/",
  validateMW(userRegistrationSchema),
  userController.registerUser
);
// verify accesstoken:
router.use((req, res, nxt) => verifyMWToken(req, res, nxt));
// 2) all users:
router.get("/", verifyMWPermissions([ROLES.Admin]), userController.getAllUsers);
// 3) user:
router.get("/:userId", userController.getUser);
// 4) update user's personal_info:
router.put(
  "/:userId/personal_info",
  validateMW(userInfoSchema),
  userController.updateUserInfo
);
// 5) update user's profile:
router.patch(
  "/:userId/profile",
  validateMW(userInterestsSchema),
  userController.updateUserProfile
);
// 6) update user's favourites:
router.patch(
  "/:userId/favourites",
  validateMW(userInterestsSchema),
  userController.updateUserFavourites
);
// 7) delete user:
router.delete("/:userId", userController.deleteUser);
// 8) delete all users:
router.delete(
  "/",
  verifyMWPermissions([ROLES.Admin]),
  userController.deleteAllUsers
);

module.exports = router;
