const asyncFunction = require("../middlewares/asyncFunction");
const Task = require("../models/Task");
const User = require("../models/User");

// 1) getting all tasks:
const getAllTasks = asyncFunction(async (req, res) => {
  // 1. check if user exist in DB:
  let userId = req.params.userId;
  let userExist = await User.findById(userId).exec();
  if (!userExist) return res.status(404).json({ errMsg: "user not found!" });
  // 2. get user`s tasks from DB:
  const allTasks = await Task.find({ userId }).select({ userId: 0, __v: 0 });
  res.json(allTasks);
});
// 2) getting task by its id:
const getTask = asyncFunction(async (req, res) => {
  // 1. find task:
  let taskId = req.taskId;
  const foundTask = await Task.findById(taskId)
    .select({ userId: 0, __v: 0 })
    .exec();
  if (!foundTask) return res.status(404).json({ errMsg: "task not found!" });
  // 2. send task:
  res.json(foundTask);
});
// 3) adding new task:
const addNewTask = asyncFunction(async (req, res) => {
  // 1. check if user exist in DB:
  let userId = req.params.userId;
  let userExist = await User.findById(userId).exec();
  if (!userExist) return res.status(404).json({ errMsg: "user not found!" });
  // 2. create task & save it in DB:
  const newTask = await Task.create({ userId, ...req.body });
  res.json(newTask);
});
// 4) editing task:
const updateTask = asyncFunction(async (req, res) => {
  // 1. find task:
  let taskId = req.taskId;
  const foundTask = await Task.findById(taskId).exec();
  if (!foundTask) return res.status(404).json({ errMsg: "task not found!" });
  // 2. modify task & save in DB:
  const result = await Task.findByIdAndUpdate(
    taskId,
    { ...req.body },
    {
      returnOriginal: false,
    }
  ).select({ userId: 0, __v: 0 });
  res.json(result);
});
// 5) check task:
const checkTask = asyncFunction(async (req, res) => {
  // 1. find task:
  let taskId = req.taskId;
  const foundTask = await Task.findById(taskId).exec();
  if (!foundTask) return res.status(404).json({ errMsg: "task not found!" });
  // 2. modify task & save in DB:
  const result = await Task.findByIdAndUpdate(
    taskId,
    { checked: !foundTask.checked },
    {
      returnOriginal: false,
    }
  ).select({ userId: 0, __v: 0 });
  res.json(result);
});
// 6) deleting task:
const deleteTask = asyncFunction(async (req, res) => {
  // 1. find task:
  let taskId = req.taskId;
  const foundTask = await Task.findById({ _id: taskId }).exec();
  if (!foundTask) return res.sendStatus(204);
  // 2. remove Task from DB:
  let result = await Task.deleteOne({ _id: taskId });
  res.json(result);
});
// 7) deleting all tasks:
const deleteAllTasks = asyncFunction(async (req, res) => {
  // 1. check if user exist in DB:
  let userId = req.params.userId;
  // 2. remove all user's tasks from DB:
  let result = await Task.deleteMany({ userId });
  res.json(result);
});

module.exports = {
  getAllTasks,
  getTask,
  addNewTask,
  updateTask,
  checkTask,
  deleteTask,
  deleteAllTasks,
};
