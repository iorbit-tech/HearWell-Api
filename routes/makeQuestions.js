const express = require("express");
const router = express.Router();
const authToken = require("../authToken");
const {
  createQuestion,
  getQuestionsByPage,
  deleteQuestion,
  getQuestionsById,
  updateQuestion,
} = require("../controllers/makeQuestions");

router.post("/", authToken, createQuestion);
router.get("/page/:id", authToken, getQuestionsByPage);
router.get("/qid/:id", authToken, getQuestionsById);
router.delete("/:id", authToken, deleteQuestion);
router.put("/:id", authToken, updateQuestion);

module.exports = router;
