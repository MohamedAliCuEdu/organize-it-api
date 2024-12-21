const asyncFunction = require("../middlewares/asyncFunction");
const Message = require("../models/Message");
const User = require("../models/User");

// 1) getging all msgs:
const getAllMsgs = asyncFunction(async (req, res) => {
  // 1. get all messages from DB:
  const allMsgs = await Message.find({}).select({
    __v: 0,
  });
  // 2. check if there are msgs:
  allMsgs?.length <= 0
    ? res.sendStatus(204)
    : res.json({ author: "all", allMessages: allMsgs });
});
// 2) getting all user's message:
const getUserMsgs = asyncFunction(async (req, res) => {
  // 1. check if userId exist in DB:
  let userId = req.params?.userId;
  let userExist = await User.findById(userId).exec();
  if (!userExist) return res.status(404).json({ errMsg: "user not found!" });
  // 2. get user`s msgs from DB:
  const useMsgs = await Message.find({ userId }).select({
    userId: 0,
    username: 0,
    __v: 0,
  });
  res.json({ author: userExist.username, allMessages: useMsgs });
});
// 3) get one message:
const getMsg = asyncFunction(async (req, res) => {
  // 1. find msg:
  let msgId = req.msgId;
  const foundMsg = await Message.findById(msgId).select({ __v: 0 }).exec();
  if (!foundMsg) return res.status(404).json({ errMsg: "msg not found!" });
  // 2. send msg:
  res.json(foundMsg);
});
// 4) add message:
const addMsg = asyncFunction(async (req, res) => {
  // 1. check if author true:
  let author = req.body?.author;
  let userId = req.userId;
  if (!author) {
    // user dont want to be kowning:
    // 1. make sure he is a user:
    const foundUser = await User.findById(userId);
    if (!foundUser) return res.status(404).json({ errMsg: "user not found!" });
    // 2. create msg & save without userId & username
    await Message.create({ content: req.body.content });
  } else {
    // add user info:
    // 1. find user:
    const foundUser = await User.findById(userId);
    if (!foundUser) return res.status(404).json({ errMsg: "user not found!" });
    // 2. create msg & save with userId & username:
    let { content } = req.body;
    await Message.create({
      userId: foundUser._id,
      username: foundUser.username,
      content,
    });
  }
  res.json({ msg: "msg has been sent" });
});
// 5) deleting msg:
const deleteMsg = asyncFunction(async (req, res) => {
  // 1. find msg:
  let msgId = req.msgId;
  const foundMessage = await Message.findById({ _id: msgId }).exec();
  if (!foundMessage) return res.sendStatus(204);
  // 2. remove msg from DB:
  let result = await Message.deleteOne({ _id: msgId });
  res.json(result);
});
// 6) deleting all msgs:
const deleteAllMessages = asyncFunction(async (req, res) => {
  let result = await Message.deleteMany({});
  res.json(result);
});

module.exports = {
  getAllMsgs,
  getUserMsgs,
  getMsg,
  addMsg,
  deleteMsg,
  deleteAllMessages,
};
