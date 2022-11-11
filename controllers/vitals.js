const { v4: uuidv4 } = require('uuid');
const Vitals = require("../models/vitals");

exports.getAllVitals = (req, res) => {
    Vitals.find()
        .then((vitals) => {
            console.log({ vitals });
            res.json(vitals);
        })
        .catch((err) =>
            res.status(404)
                .json({ message: "no vitals found", error: err.message })
        );
};

exports.createVitals = (req, res) => {
    req.body.userId = uuidv4();
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

exports.deleteTodo = (req, res) => {
    Todo.findByIdAndRemove(req.params.id, req.body).then((data) =>
        res
            .json({ message: "todo deleted successfully", data })
            .catch((err) =>
                res
                    .status(404)
                    .json({ error: "book not found", message: err.message })
            )
    );
};
