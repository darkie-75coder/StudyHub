const jwt = require("jsonwebtoken");
const userModel = require("../Models/user.model");
const bcrypt = require("bcryptjs");
const config = require("../Config/config");

async function register(req, res) {
  const { username, email, password } = req.body;

  const isUserExists = await userModel.findOne({
    email,
  });

  if (isUserExists) {
    return res.status(400).json({
      message: "Email already exists! ❌",
    });
  }

  const hashed = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    username,
    email,
    password: hashed,
  });

  const token = jwt.sign(
    {
      id: user._id,
    },
    config.JWT_SECRET,
    {
      expiresIn: "7d",
    },
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: config.NODE_ENV === "production",
    sameSite: config.NODE_ENV === "production" ? "none" : "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(201).json({
    message: "Registered successfully ✅",
  });
}

async function login(req, res) {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(400).json({
      message: "Invalid email ❌",
    });
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    return res.status(400).json({
      message: "Password is Incorrect ❌",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    config.JWT_SECRET,
    {
      expiresIn: "7d",
    },
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: config.NODE_ENV === "production",
    sameSite: config.NODE_ENV === "production" ? "none" : "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    message: "Successfully logged in ✅",
  });
}

async function logout(req, res) {
  res.clearCookie("token", {
    httpOnly: true,
    secure: config.NODE_ENV === "production",
    sameSite: config.NODE_ENV === "production" ? "none" : "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    message: "Successfully logged out ✅",
  });
}

async function auth(req, res) {
  res.status(200).json({
    message: "Authenticated ✅",
  });
}

async function getUser(req, res) {
  const userId = req.user;

  const user = await userModel.findOne({
    _id: userId,
  });

  res.status(200).json({
    user: user,
  });
}

module.exports = { register, login, logout, auth, getUser };
