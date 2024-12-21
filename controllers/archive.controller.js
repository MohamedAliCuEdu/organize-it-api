const asyncFunction = require("../middlewares/asyncFunction");
const Note = require("../models/Note");

// 1) get all archive notes:
const getAllArchiveNotes = asyncFunction(async (req, res) => {
  // 1. get user`s notes from DB:
  let userId = req.userId;
  const allNotes = await Note.find({ userId, isArchived: true }).select({
    userId: 0,
    __v: 0,
  });
  // 2. send allNotes:
  res.json(allNotes);
});
// 2) un archive note:
const unArchiveNote = asyncFunction(async (req, res) => {
  // 1. find note:
  let noteId = req.noteId;
  const foundNote = await Note.findById(noteId).exec();
  if (!foundNote) return res.status(404).json({ errMsg: "note not found!" });
  // 2. set is_archive to false & save:
  foundNote.isArchived = false;
  await foundNote.save();
  // 3. send success msg:
  res.json({ msg: "the note has been successfully unarchived!" });
});
// 3) un archive all notes:
const unArchiveAllNotes = asyncFunction(async (req, res) => {
  // 1. find note:
  let userId = req.userId;
  // 2. un archive all & save:
  await Note.updateMany({ userId, isArchived: true }, { isArchived: false });
  // 3. send success msg:
  res.json({ msg: "all archived notes have been successfully unarchived!" });
});
// 4) deleting note:
const deleteNote = asyncFunction(async (req, res) => {
  // 1. find note:
  let noteId = req.noteId;
  const foundNote = await Note.findById({ _id: noteId }).exec();
  if (!foundNote) return res.sendStatus(404);
  // 2. remove note from DB:
  let result = await Note.deleteOne({ _id: noteId });
  res.json(result);
});
// 5) delete note notes:
const deleteAllArchiveNotes = asyncFunction(async (req, res) => {
  // 1. check if user exist in DB:
  let userId = req.userId;
  // 2. remove all user`s notes from DB:
  let result = await Note.deleteMany({ userId, isArchived: true });
  res.json(result);
});

module.exports = {
  getAllArchiveNotes,
  unArchiveNote,
  unArchiveAllNotes,
  deleteNote,
  deleteAllArchiveNotes,
};
