const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const authToken = require("../authToken");
const { createUsers, userLogin, updateUser } = require("../controllers/users");

router.post("/", createUsers);
router.post("/login", userLogin);
router.put("/:id", authToken, updateUser);

module.exports = router;
