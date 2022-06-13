"use steict";
const express = require("express");
const bcrypt = require("bcrypt");
const base64 = require("base-64");

const { users } = require("../models/index.model");
const signInRouter = express.Router();
const basicAuth = require("../auth/auth");

signInRouter.post("/signin", basicAuth, handleSignIn);

async function handleSignIn(req, res) {
  let basicHeaderParts = req.headers.authorization.split(" ");
  let encoded = basicHeaderParts[1];
  let decoded = base64.decode(encoded);
  let [username, password] = decoded.split(":");
  try {
    const user = await users.findOne({ where: { username: username } });
    const isValid = await bcrypt.compare(password, user.password);
    if (isValid) {
      res.status(200).json(user);
    } else {
      res.status(500).send("wrong username or password");
    }
  } catch {
    res.status(500).send("app error");
  }
}

module.exports = signInRouter;
