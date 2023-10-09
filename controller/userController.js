const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const TOKEN_KEY = "swerfodsur!@#$123<>?12swe";

module.exports.userSignUp = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      throw new Error("Invalid user email.");
    }
    if (password === null || typeof password === "undefined") {
      throw new Error("Password cannot be null or undefined.");
    }
    if (password.trim() === "") {
      throw new Error("Password cannot be an empty string.");
    }
    const user = await User.findOne({ email });

    if (user) {
      throw new Error("User already exist.");
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    const newUser = await User.create({ email: email, password: hashPassword });
    const userToken = jwt.sign({ email, id: newUser._id }, TOKEN_KEY, {
      expiresIn: "1d",
    });
    newUser.token = userToken;
    newUser.save().then((result) => {
      res.status(200).send({ message: "User created successfully.", success: true });
    });
  } catch (error) {
    res.status(400).json({ message: error.message, success: false });
  }
};

module.exports.userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      throw new Error("Invalid user email.");
    }
    if (!password) {
      throw new Error("Invalid passsword.");
    }
    const user = await User.findOne({ email: email });

    if (!user) {
      throw new Error("User not found.");
    } else {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new Error("Either user email or password is invalid.");
      } else {
        const userToken = jwt.sign({ email, id: user._id }, TOKEN_KEY, {
          expiresIn: "1d",
        });
        res.status(200).json({ message: "User successfully logged in.", data: userToken, success: true });
      }
    }
  } catch (error) {
    res.status(400).json({ message: error.message, success: false });
  }
};
