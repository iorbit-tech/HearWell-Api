const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const authToken = require("../authToken");
const {
  createUsers,
  userLogin,
  updateUser,
  getAllUsers,
  isUserExist,
  userGoogleLogin,
} = require("../controllers/users");

router.post("/", createUsers);
router.get("/", authToken, getAllUsers);
router.post("/login", userLogin);
router.post("/isuser", isUserExist);
router.post("/googlelogin", userGoogleLogin);

router.put("/:id", authToken, updateUser);

module.exports = router;
