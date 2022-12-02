const mongoose = require("mongoose");

const SurveyQuestionSchema = new mongoose.Schema({
  qId: {
    type: String,
    required: true,
  },

  question: {
    type: String,
    required: true,
  },
  order: {
    type: Number,
    required: true,
  },
});

const SurveyQuestion = mongoose.model("survey-questions", SurveyQuestionSchema);

module.exports = SurveyQuestion;
