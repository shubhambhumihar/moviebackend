const express = require("express");
const {
  registerUser,
  loginUser,
  logout,
  getUserDetail,
} = require("../controllers/authCntlr");
const { isAuthenticated } = require("../middlewares/auth");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logout);
router.route("/profile").get(isAuthenticated, getUserDetail);

module.exports = router;
