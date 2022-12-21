const mongoose = require("mongoose");
// mongoose.pluralize(null);
const SurveyAnswersSchema = new mongoose.Schema({
    
  questionId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  answerId: {
    type: String,
    required: true,
  },
  answerType: {
    type: String,
    // required: true,
  },
  page: {
    type: String,
    // required: true,
  },
  options: {
    type: Array,
    // required: true,
  },
});

const surveyAnswers = mongoose.model("survey-answer", SurveyAnswersSchema);

module.exports = surveyAnswers;
