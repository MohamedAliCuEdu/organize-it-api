const User = require("../models/User");
const ROLES = require("../config/roles");
const EXPIRES_LIST = require("../config/expires_list");
// middlewares:
const bcrypt = require("bcrypt");
const genTokens = require("../utils/genTokens");
const asyncFunction = require("../middlewares/asyncFunction");

// 1) get all users:
const getAllUsers = asyncFunction(async (req, res) => {
  // 1. check if threre query in request:
  let query = req?.query;
  // 2. get all users from DB:
  const allUsers = await User.find(query || {}).select({
    refreshToken: 0,
    __v: 0,
  });
  // 3. check if there is users in DB:
  if (allUsers.length <= 0) return res.sendStatus(204);
  // 4. send all users;
  res.json(allUsers);
});
// 2) gett user data by its id:
const getUser = asyncFunction(async (req, res) => {
  // 1. find User:
  let userId = req.userId;
  const foundUser = await User.findById(userId)
    .select({
      _id: 0,
      password: 0,
      pw: 0,
      roles: 0,
      refreshToken: 0,
      __V: 0,
    })
    .exec();
  if (!foundUser) return res.status(404).json({ errMsg: "user not found!" });
  // 2. send User data:
  res.json(foundUser);
});
// 3) register new user:
const registerUser = asyncFunction(async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  // 1. check if username duplicated:
  let usernameExist = await User.findOne({
    username: req.body.username,
  }).exec();
  if (usernameExist)
    return res
      .status(409)
      .json({ errMsg: `username "${username}" has been already taken!` });
  // 2. hashing password:
  let salt = await bcrypt.genSalt(10);
  const hashPwd = await bcrypt.hash(password, salt);
  // 3. create instance of User:
  const newUser = await User({
    ...req.body,
    password: hashPwd,
    pw: password,
  });
  // 4. generate access & refresh Tokens:
  let payload = {
    userId: newUser._id,
    username: newUser.username,
    roles: [ROLES.User],
  };
  const { accessToken, refreshToken } = genTokens(payload);
  // 5. add refreshToken to newUser & save user in DB:
  newUser.refreshToken = [refreshToken];
  await newUser.save();
  // 6. save tokens in headers.
  res.header("authentication", accessToken);
  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    maxAge: EXPIRES_LIST.jwtCookie,
    sameSite: "none",
    secure: true,
  });
  // 7. send accessToken & needed information;
  res.json({
    accessToken,
    userInfo: {
      userId: newUser._id,
      username: newUser.username,
      avatarColor: newUser.avatarColor,
      roles: newUser.roles,
    },
  });
});
// 4) editing user personal info:
const updateUserInfo = asyncFunction(async (req, res) => {
  // 1. find User:
  let userId = req.userId;
  const foundUser = await User.findById(userId).exec();
  if (!foundUser) return res.status(404).json({ errMsg: "user not found!" });
  // 2. update user info:
  for (let key in req.body) {
    foundUser[key] = req.body[key];
  }
  await foundUser.save();
  // 3. send response;
  res.json({ msg: "user information updated!" });
});
// 5) editing user pro file:
const updateUserProfile = asyncFunction(async (req, res) => {
  // 1. find User:
  let userId = req.userId;
  const foundUser = await User.findById(userId).exec();
  if (!foundUser) return res.status(404).json({ errMsg: "user not found!" });
  // 2. update profile data:
  let data = req.body;
  if (!data) return res.status(404).json({ msg: "there is no value!" });
  let key = Object.keys(data)[0];
  const result = await User.findByIdAndUpdate(userId, req.body, {
    returnOriginal: false,
  }).select({ [key]: 1 });
  // 3. send response;
  res.json(result);
});
// 6) editing user's favourites:
const updateUserFavourites = asyncFunction(async (req, res) => {
  // 1. find User:
  let userId = req.userId;
  const foundUser = await User.findById(userId).exec();
  if (!foundUser) return res.status(404).json({ errMsg: "user not found!" });
  // 2. update favourite list:
  let data = req.body;
  let favouriteType = Object.keys(data)[0];
  // 3. update user favourites:
  foundUser.favourites[favouriteType] = data[favouriteType];
  await foundUser.save();
  // 4. send response;
  res.json(foundUser.favourites[favouriteType]);
});
// 7) delete user by its id:
const deleteUser = asyncFunction(async (req, res) => {
  // 1. find User:
  let userId = req.userId;
  const foundUser = await User.findById(userId).exec();
  if (!foundUser) return res.sendStatus(204);
  // 2. remove User from DB:
  await User.deleteOne({ _id: userId });
  // 3. send response;
  res.json({ msg: "user has been deleted!" });
});
// 8) deleting all users:
const deleteAllUsers = asyncFunction(async (req, res) => {
  // 1. check if there is any users:
  const allUsers = await User.find();
  if (allUsers.length <= 0) return res.sendStatus(204);
  // 2. remove all users from DB:
  let result = await User.deleteMany({});
  // 4. send response;
  res.json(result);
});

module.exports = {
  getAllUsers,
  getUser,
  registerUser,
  updateUserProfile,
  updateUserInfo,
  updateUserFavourites,
  deleteUser,
  deleteAllUsers,
};
