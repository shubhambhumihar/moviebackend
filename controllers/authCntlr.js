const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const sendToken = require("../utils/sendJwtToken");

exports.registerUser = asyncHandler(async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      throw new Error("Please Enter all required fields");
    }

    const findUser = await User.findOne({ email: email });
    if (findUser) {
      throw new Error("User is already registered!");
    }

    const newUser = await User.create(req.body);

    sendToken(newUser, 201, res);
  } catch (error) {
    throw new Error(error.message);
  }
});

exports.loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email }).select("+password");

  if (!user) {
    throw new Error("User doesn't exist. Login first!");
  }
  // now check the password
  const isValidPassword = await user.comparePassword(password);

  if (!isValidPassword) {
    throw new Error("Invalid email or password");
  }

  sendToken(user, 200, res);
});

exports.logout = asyncHandler(async (req, res) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });

    res
      .status(200)
      .json({ success: true, message: "User logged out successfully" });
  } catch (error) {
    console.log(error.message);
  }
});

// !GET MY PRofile DETAILS
exports.getUserDetail = asyncHandler(async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (user) {
      res.status(200).json({ success: true, user });
    }
  } catch (error) {
    console.log(error.message);
  }
});
