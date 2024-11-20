const router = require("express").Router();
const noteController = require("../controllers/note.controller");

const noteSchmea = require("../utils/note.schema");
// middlewares:
const objectIdMWValidator = require("../middlewares/objectIdMWValidator");
const verifyMWToken = require("../middlewares/verifyMWToken");
const validateMW = require("../middlewares/validateMW");

// validate id param:
router.param("userId", objectIdMWValidator("userId"));
router.param("noteId", objectIdMWValidator("noteId"));
router.use(verifyMWToken);

// 1) all notes route:
router.get("/:userId", noteController.getAllNotes);
// 2) note route:
router.get("/:userId/:noteId", noteController.getNote);
// 3) new note route:
router.post("/:userId", validateMW(noteSchmea), noteController.addNewNote);
// 4) update note route:
router.put(
  "/:userId/:noteId",
  validateMW(noteSchmea),
  noteController.updateNote
);
// 4) archieve note route:
router.patch("/:userId/:noteId/archive", noteController.archiveNote);
// 6) delete note route:
router.delete("/:userId/:noteId", noteController.deleteNote);
// 7) delete all notes route:
router.delete("/:userId", noteController.deleteAllNotes);

module.exports = router;
