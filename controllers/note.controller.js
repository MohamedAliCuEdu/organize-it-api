const asyncFunction = require("../middlewares/asyncFunction");
const Note = require("../models/Note");
const User = require("../models/User");

// 1) get all notes:
const getAllNotes = asyncFunction(async (req, res) => {
  // 1. get user`s notes from DB:
  let userId = req.userId;
  const allNotes = await Note.find({ userId, isArchived: false }).select({
    userId: 0,
    __v: 0,
  });
  // 2. get all tags names
  const aggregateTags = await Note.aggregate([
    { $unwind: "$tags" }, // Unwind the array of tags
    { $group: { _id: "$tags" } }, // Group by tag name (to get unique tags)
  ]);
  // create an array of tag names
  let allTags = aggregateTags.map((tag) => tag._id);
  res.json({ allNotes, allTags });
});
// 2) get note by its id:
const getNote = asyncFunction(async (req, res) => {
  // 1. find note:
  let noteId = req.noteId;
  const foundNote = await Note.findById(noteId)
    .select({ userId: 0, __v: 0 })
    .exec();
  if (!foundNote) return res.status(404).json({ errMsg: "note not found!" });
  // 2. send note:
  res.json(foundNote);
});
// 3) adding new note:
const addNewNote = asyncFunction(async (req, res) => {
  // 1. find user:
  let userId = req.userId;
  const foundUser = await User.findById(userId);
  if (!foundUser) return res.status(404).json({ errMsg: "user not found!" });
  // 2. create note & save it in DB:
  const newNote = await Note.create({ ...req.body, userId });
  res.json(newNote);
});
// 4) editing note:
const updateNote = asyncFunction(async (req, res) => {
  // 1. find note document:
  let noteId = req.noteId;
  const foundNote = await Note.findById(noteId).exec();
  if (!foundNote) return res.status(404).json({ errMsg: "note not found!" });
  // 2. modify note & save it in DB:
  const result = await Note.findByIdAndUpdate(noteId, req.body, {
    returnOriginal: false,
  }).select({ userId: 0, __v: 0 });
  res.json(result);
});
// 5) archiving note:
const archiveNote = asyncFunction(async (req, res) => {
  // 1. find note document:
  let noteId = req.noteId;
  const foundNote = await Note.findById(noteId).exec();
  if (!foundNote) return res.status(404).json({ errMsg: "note not found!" });
  // 2. set isArchived to true & save note in DB:
  const result = await Note.findByIdAndUpdate(
    noteId,
    { isArchived: true },
    {
      returnOriginal: false,
    }
  ).select({ __v: 0 });
  res.json(result);
});
// 6) deleting note:
const deleteNote = asyncFunction(async (req, res) => {
  // 1. find note:
  let noteId = req.noteId;
  const foundNote = await Note.findById({ _id: noteId }).exec();
  if (!foundNote) return res.sendStatus(404);
  // 2. remove note from DB:
  let result = await Note.deleteOne({ _id: noteId });
  res.json(result);
});
// 7) deleting all notes:
const deleteAllNotes = asyncFunction(async (req, res) => {
  // 1. check if user exist in DB:
  let userId = req.userId;
  // 2. remove all user`s notes from DB:
  let result = await Note.deleteMany({ userId, isArchived: false });
  res.json(result);
});

module.exports = {
  getAllNotes,
  getNote,
  addNewNote,
  updateNote,
  archiveNote,
  deleteNote,
  deleteAllNotes,
};
