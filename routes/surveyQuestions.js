const express = require("express");
const router = express.Router();
const authToken = require("../authToken");
const { getAllQuestions } = require("../controllers/surveyQuestions");

router.get("/", authToken, getAllQuestions);

module.exports = router;
