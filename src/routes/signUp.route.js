"use steict";

const express = require("express");
const bcrypt = require("bcrypt");

const { users } = require("../models/index.model");

const signUpRouter = express.Router();

signUpRouter.post("/signup", handelUp)

async function handelUp (req, res) {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const record = await users.create(req.body);
    res.status(201).json(record);
  } catch (e) {
    res.status(403).send("Error");
  }
}

module.exports = signUpRouter;
