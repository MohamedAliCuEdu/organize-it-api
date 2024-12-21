const router = require("express").Router();

// middlewares:
const objectIdMWValidator = require("../middlewares/objectIdMWValidator");
const verifyMWToken = require("../middlewares/verifyMWToken");
const validateMW = require("../middlewares/validateMW");
const verifyMWPermissions = require("../middlewares/verifyMWPermissions");
const msgController = require("../controllers/msg.controller");
const ROLES = require("../config/roles");
const msgSchmea = require("../utils/message.schema");

// validate id param:
router.param("userId", objectIdMWValidator("userId"));
router.param("msgId", objectIdMWValidator("msgId"));
router.use(verifyMWToken);

// 1) new msg route:
router.post("/:userId", validateMW(msgSchmea), msgController.addMsg);
router.use(verifyMWPermissions([ROLES.Admin]));
// 2) all msgs route:
router.get("/", msgController.getAllMsgs);
// 3) all user's msgs route:
router.get("/:userId", msgController.getUserMsgs);
// 4) get msg route:
router.get("/:userId/:msgId", msgController.getMsg);
// 5) delete msg route:
router.delete("/:msgId", msgController.deleteMsg);
// 6) delete all msgs route:
router.delete("/", msgController.deleteAllMessages);

module.exports = router;
