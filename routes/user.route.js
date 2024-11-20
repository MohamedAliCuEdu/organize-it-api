const router = require("express").Router();
const ROLES = require("../config/roles");
const userController = require("../controllers/user.controller");
// middlewares:
const validateMW = require("../middlewares/validateMW");
const objectIdMWValidator = require("../middlewares/objectIdMWValidator");
const verifyMWToken = require("../middlewares/verifyMWToken");
const verifyMWPermissions = require("../later/verifyMWPermissions");
// schema:
const userRegistrationSchema = require("../utils/userRegistration.schema");
const userInfoSchema = require("../utils/userInfo.schema");
const userInterestsSchema = require("../utils/userInterests.schema");
const userAuthSchema = require("../utils/userAuth.schema");

// validate id param:
router.param("userId", objectIdMWValidator("userId"));
// verify accesstoken:
router.use((req, res, nxt) => {
  if (req.method === "POST") {
    nxt();
  } else {
    return verifyMWToken(req, res, nxt);
  }
});

// 1) all users:
router.get("/", verifyMWPermissions([ROLES.Admin]), userController.getAllUsers);
// 2) user:
router.get("/:userId", userController.getUser);
// 3) new user registeration:
router.post(
  "/",
  validateMW(userRegistrationSchema),
  userController.registerUser
);
// 4) update user auth:
router.put(
  "/:userId",
  validateMW(userAuthSchema),
  userController.updateUserAuth
);
// 5) update user's personal_info:
router.put(
  "/:userId/personal_info",
  validateMW(userInfoSchema),
  userController.updateUserInfo
);
// 6) update user's profile:
router.patch(
  "/:userId/profile",
  validateMW(userInterestsSchema),
  userController.updateUserProfile
);
// 7) update user's favourites:
router.patch(
  "/:userId/favourites",
  validateMW(userInterestsSchema),
  userController.updateUserFavourites
);
// 8) delete user:
router.delete("/:userId", userController.deleteUser);
// 9) delete all users:
router.delete(
  "/",
  verifyMWPermissions([ROLES.Admin]),
  userController.deleteAllUsers
);

module.exports = router;
