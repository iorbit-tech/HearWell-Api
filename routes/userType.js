const express = require("express");
const router = express.Router();
const { getAllUserType } = require("../controllers/userType");
const authToken = require("../authToken");

router.get("/", authToken, getAllUserType);

module.exports = router;
