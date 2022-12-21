const surveyAnswers = require("../models/surveyAnswers");
const { v4: uuidv4 } = require("uuid");

exports.getAnswersFromUserByPage = (req, res) => {
  const query = { userId: req.body.userId, questionId: req.body.questionId ,page:req.body.page };

  surveyAnswers
    .find(query)
    .then((question) => {
      console.log({ question });
      if (question == null)
        return res
          .status(404)
          .json({ message: "no questions found" });
      res.status(200).json(question);
    })
    .catch((err) =>
      res
        .status(404)
        .json({ message: "no questions found", error: err.message })
    );
};

exports.getAnswersFromUser = (req, res) => {
  const query = { userId: req.body.userId, questionId: req.body.questionId };

  surveyAnswers
    .findOne(query)
    .then((question) => {
      console.log({ question });
      if (question == null)
        return res
          .status(404)
          .json({ message: "no questions found" });
      res.status(200).json(question);
    })
    .catch((err) =>
      res
        .status(404)
        .json({ message: "no questions found", error: err.message })
    );
};

exports.getQuestionsById = (req, res) => {
  const query = { questionId: req.params.id };

  makeQuestions
    .findOne(query)
    .then((question) => {
      console.log({ question });
      res.status(200).json(question);
    })
    .catch((err) =>
      res
        .status(404)
        .json({ message: "no questions found", error: err.message })
    );
};

exports.createAnswers = async (req, res) => {
  try {
    // const query = { page: req.body.page, order: req.body.order };
    // makeQuestions.findOne(query).then((question) => {
    //   console.log({ question });
    //   if (question)
    //     return res
    //       .status(403)
    //       .json({ message: "Question order already exists " });

    req.body.answerId = uuidv4();
    console.log(req.body);
    // req.body.password = hashPassword;
    // console.log(hashPassword);
    surveyAnswers
      .create(req.body)
      .then((data) => {
        // console.log({ data },"data from ");
        res.json({ message: "Answers added successfully", data });
      })
      .catch((err) =>
        res.status(400).json({
          message: "unable to add answer",
          error: err.message,
        })
      );
    // });
  } catch {}
};

exports.updateQuestion = (req, res) => {
  console.log("id: ", req.params.id);
  console.log("body: ", req.body);
  makeQuestions
    .findOneAndUpdate({ questionId: req.params.id }, { ...req.body })
    .then((question) => {
      console.log("edit", { question });
      return res.json({ message: "updated successfully", question });
    })
    .catch((err) => {
      res
        .status(400)
        .json({ error: "unable to update question", message: err.message });
    });
};

exports.deleteQuestion = (req, res) => {
  const query = { questionId: req.params.id };

  makeQuestions
    .findOneAndDelete(query)
    .then((question) => {
      console.log({ question });
      res
        .status(202)
        .json({ message: "Question deleted successfully", question });
    })
    .catch((err) =>
      res
        .status(404)
        .json({ message: "no questions found", error: err.message })
    );
};
