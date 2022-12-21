const { v4: uuidv4 } = require("uuid");
const Vitals = require("../models/vitals");

exports.getVitalsById = (req, res) => {
  const query = { vitalId: req.params.id };

  Vitals.findOne(query)
    .then((notes) => {
      console.log({ notes });
      res.json(notes);
    })
    .catch((err) =>
      res.status(404).json({ message: "no vitals found", error: err.message })
    );
};

exports.getUsersVitals = (req, res) => {
  const query = { userId: req.params.id };

  Vitals.find(query)
    .then((notes) => {
      console.log({ notes });
      res.json(notes);
    })
    .catch((err) =>
      res.status(404).json({ message: "no vitals found", error: err.message })
    );
};

exports.getAllVitals = (req, res) => {
  Vitals.find()
    .then((vitals) => {
      console.log({ vitals });
      res.json(vitals);
    })
    .catch((err) =>
      res.status(404).json({ message: "no vitals found", error: err.message })
    );
};

exports.createVitals = (req, res) => {
  req.body.vitalId = uuidv4();
  Vitals.create(req.body)
    .then((data) => {
      console.log({ data });
      res.json({ message: "vitals added successfully", data });
    })
    .catch((err) =>
      res.status(400).json({
        message: "unable to add new vitals",
        error: err.message,
      })
    );
};

exports.updateVitals = (req, res) => {
  console.log("id: ", req.params.id);
  console.log("body: ", req.body);
  Vitals.findOneAndUpdate({ vitalId: req.params.id }, { ...req.body })
    .then((vital) => {
      console.log("edit", { vital });
      return res.json({ message: "updated successfully", vital });
    })
    .catch((err) => {
      res
        .status(400)
        .json({ error: "unable to update user", message: err.message });
    });
};

exports.putUpdateTodo = (req, res) => {
  console.log("id: ", req.params.id);
  console.log("body: ", req.body);
  Todo.findByIdAndUpdate(req.params.id, req.body)
    .then((todo) => {
      console.log("edit", { todo });
      return res.json({ message: "updated successfully", todo });
    })
    .catch((err) =>
      res
        .status(400)
        .json({ error: "unable to update todo", message: err.message })
    );
};

exports.deleteVital = (req, res) => {
console.log("Deleting vitals")
  Vitals.findOneAndDelete({vitalId: req.params.id}).then((data) =>
    res
      .json({ message: "Vital deleted successfully", data })
      .catch((err) =>
        res.status(404).json({ error: "vital not found", message: err.message })
      )
  );
};
