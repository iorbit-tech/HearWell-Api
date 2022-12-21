const express = require("express");
const router = express.Router();
const authToken = require("../authToken");
const { createAnswers,getAnswersFromUser,getAnswersFromUserByPage } = require("../controllers/surveyAnswers");

router.post("/", authToken, createAnswers);
router.post("/get", authToken, getAnswersFromUser);
router.post("/get/bypage", authToken, getAnswersFromUserByPage);

//router.get("/:id", authToken, getCahtById);
// router.get("/noteid/:id", authToken, getNotesById);

module.exports = router;
