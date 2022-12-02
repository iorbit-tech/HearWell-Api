const mongoose = require("mongoose");
// mongoose.pluralize(null);
const MakeQuestionSchema = new mongoose.Schema({
  questionId: {
    type: String,
    required: true,
  },
  question: {
    type: String,
    // required: true,
  },
  createdBy: {
    type: String,
    required: true,
  },
  order: {
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

const makeQuestions = mongoose.model("survey-question", MakeQuestionSchema);

module.exports = makeQuestions;
