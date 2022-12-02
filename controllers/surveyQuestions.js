const SurveyQuestions = require("../models/surveyQuestions")

exports.getAllQuestions = (req, res) => {
    SurveyQuestions.find()
      .then((questions) => {
        console.log({ questions });
        res.json(questions);
      })
      .catch((err) =>
        res.status(404).json({ message: "no vitals found", error: err.message })
      );
  };