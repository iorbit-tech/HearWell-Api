const makeQuestions = require("../models/makeQuestions");
const { v4: uuidv4 } = require("uuid");

exports.getQuestionsByPage = (req, res) => {
  const query = { page: req.params.id };

  makeQuestions
    .find(query)
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

exports.createQuestion = async (req, res) => {
  try {
    const query = { page: req.body.page, order: req.body.order };
    makeQuestions.findOne(query).then((question) => {
      console.log({ question });
      if (question)
        return res
          .status(403)
          .json({ message: "Question order already exists " });

      req.body.questionId = uuidv4();
      console.log(req.body);
      // req.body.password = hashPassword;
      // console.log(hashPassword);
      makeQuestions
        .create(req.body)
        .then((data) => {
          // console.log({ data },"data from ");
          res.json({ message: "Question created successfully", data });
        })
        .catch((err) =>
          res.status(400).json({
            message: "unable to create question",
            error: err.message,
          })
        );
    });
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
