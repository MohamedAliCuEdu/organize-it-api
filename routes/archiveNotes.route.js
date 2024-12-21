const router = require("express").Router();
const archiveController = require("../controllers/archive.controller");
const objectIdMWValidator = require("../middlewares/objectIdMWValidator");

// middlewares:
const verifyMWToken = require("../middlewares/verifyMWToken");

// validate id param:
router.param("userId", objectIdMWValidator("userId"));
router.param("noteId", objectIdMWValidator("noteId"));
router.use(verifyMWToken);

// 1) get all archive notes:
router.get("/:userId", archiveController.getAllArchiveNotes);
// 2) unarchive note:
router.patch("/:userId/unarchive/:noteId", archiveController.unArchiveNote);
// 3) unarchive all notes
router.patch("/:userId/unarchive", archiveController.unArchiveAllNotes);
// 4) delete note:
router.delete("/:userId/:noteId", archiveController.deleteNote);
// 5) delete all archive notes:
router.delete("/:userId", archiveController.deleteAllArchiveNotes);

module.exports = router;
