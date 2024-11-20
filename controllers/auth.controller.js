const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const asyncFunction = require("../middlewares/asyncFunction");
const User = require("../models/User");

const EXPIRES_LIST = require("../config/expires_list");
const genTokens = require("../utils/genTokens");

// 1) user log in:
const userLogin = asyncFunction(async (req, res) => {
  // 1. find user:
  const { username, password } = req.body;
  let foundUser = await User.findOne({ username }).exec();
  if (!foundUser)
    return res.status(401).json({ errMsg: "username or password in invalid!" });
  // 2. check password:
  let isValidPwd = await bcrypt.compare(password, foundUser.password);
  if (!isValidPwd)
    return res.status(401).json({ errMsg: "username or password in invalid!" });
  // 3. check if there jwt cookie & remove it from user:
  let jwtCookie = req.cookies?.jwt;
  let newRefreshTokenArr = !jwtCookie
    ? foundUser.refreshToken
    : foundUser.refreshToken.filter((rt) => rt !== jwtCookie);
  // 4. detect token reuse:
  if (jwtCookie) {
    /* 
    Scenario added here: 
    1) User logs in but never uses RT and does not logout 
    2) RT is stolen
    3) If 1 & 2, reuse detection is needed to clear all RTs when user logs in
    */
    const foundToken = User.findOne({ refreshToken: jwtCookie }).exec();
    if (!foundToken) newRefreshTokenArr = [];
    res.clearCookie("jwt", {
      httpOnly: true,
      maxAge: EXPIRES_LIST.jwtCookie,
      sameSite: "None",
      secure: true,
    });
  }
  // 5. generate new access & refresh tokens:
  let payload = {
    userId: foundUser._id,
    username: foundUser.username,
    roles: Object.values(foundUser.roles),
  };
  const { accessToken, refreshToken: newRefreshToken } = genTokens(payload);
  // 6. save refreshTokens in user & setHeaders:
  foundUser.refreshToken = [...newRefreshTokenArr, newRefreshToken];
  await foundUser.save();
  res.header("authentication", accessToken);
  res.cookie("jwt", newRefreshToken, {
    httpOnly: true,
    maxAge: EXPIRES_LIST.jwtCookie,
    sameSite: "None",
    secure: true,
  });
  // 7. send accessToken & needed user info:
  res.json({
    accessToken,
    userInfo: {
      userId: foundUser._id,
      username: foundUser.username,
      avatarColor: foundUser.avatarColor,
      roles: Object.values(foundUser.roles),
    },
  });
});
// 2) user log out:
const userLogout = asyncFunction(async (req, res) => {
  // 1. get refreshToken
  let refreshToken = req.cookies?.jwt;
  if (!refreshToken) return res.sendStatus(204);
  // 2. clear jwt cookie:
  res.clearCookie("jwt", {
    httpOnly: true,
    maxAge: EXPIRES_LIST.jwtCookie,
    sameSite: "None",
    secure: true,
  });
  // 3. find user & remove refreshToken:
  let foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) return res.status(204).json({ errMsg: "user not found!" });
  foundUser.refreshToken = foundUser.refreshToken.filter(
    (rt) => rt !== refreshToken
  );
  await foundUser.save();
  // 4. send response:
  res.json({ msg: "good bye!" });
});
// 3) refresh token:
const updateRefreshToken = asyncFunction(async (req, res) => {
  // 1. check for refreshToken:
  let refreshToken = req.cookies?.jwt;
  if (!refreshToken) return res.status(401).json({ errMsg: "no tokens" });
  // 2. clear old token from cookies:
  res.clearCookie("jwt", {
    maxAge: EXPIRES_LIST.jwtCookie,
    sameSite: "None",
    httpOnly: true,
    secure: true,
  });
  // 3. find user by token:
  let foundUser = await User.findOne({ refreshToken }).exec();
  // 4. detect token reuse:
  if (!foundUser) {
    jwt.verify(
      refreshToken,
      process.env.REFRESH_SECRET_TOKEN,
      async (err, decoded) => {
        if (err)
          return res.status(403).json({ errMsg: "expired reused token" });
        // remove all tokens from hacked user data:
        const hackedUser = await User.findOne({
          username: decoded.username,
        }).exec();
        if (!hackedUser)
          return res.status(403).json({ errMsg: "there is no hacked user!" });
        hackedUser.refreshToken = [];
        await hackedUser.save();
      }
    );
    return res.status(403).json({ msg: "token is reused!" });
  }
  // 5. foundUser && filter refresh tokens:
  const newRefreshTokenArr = foundUser?.refreshToken.filter(
    (rt) => rt !== refreshToken
  );
  // 6. verify token for generate tokens:
  jwt.verify(
    refreshToken,
    process.env.REFRESH_SECRET_TOKEN,
    async (err, decoded) => {
      if (err) {
        foundUser.refreshToken = [...newRefreshTokenArr];
        await foundUser.save();
      }
      if (err || foundUser.username !== decoded.username)
        return res.status(403).json({ errMsg: "invalid token" });
      // 7. generate new Tokens:
      const { accessToken, refreshToken: newRefreshToken } = genTokens({
        userId: decoded.userId,
        username: decoded.username,
        roles: decoded.roles,
      });
      // 8. save refreshToken in DB & set headers:
      foundUser.refreshToken = [...newRefreshTokenArr, newRefreshToken];
      await foundUser.save();
      res.header("authentication", accessToken);
      res.cookie("jwt", newRefreshToken, {
        httpOnly: true,
        maxAge: EXPIRES_LIST.jwtCookie,
        sameSite: "None",
        secure: true,
      });
      // 9. send accessToken & need user info:
      res.json({
        accessToken,
        userInfo: {
          userId: foundUser._id,
          username: foundUser.username,
          avatarColor: foundUser.avatarColor,
          roles: foundUser.roles,
        },
      });
    }
  );
});

module.exports = { userLogin, userLogout, updateRefreshToken };
