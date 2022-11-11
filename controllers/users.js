const { v4: uuidv4 } = require("uuid");
const Users = require("../models/users");
const bcrypt = require("bcrypt");

exports.getAllUsers = (req, res) => {
  Vitals.find()
    .then((vitals) => {
      console.log({ vitals });
      res.json(vitals);
    })
    .catch((err) =>
      res.status(404).json({ message: "no vitals found", error: err.message })
    );
};

exports.createUsers = async (req, res) => {
  try {
    hashPassword = await bcrypt.hash(req.body.password, 10);
    req.body.userId = uuidv4();
    req.body.password = hashPassword;
    console.log(hashPassword);
    Users.create(req.body)
      .then((data) => {
        console.log({ data });
        res.json({ message: "User registration successfull", data });
      })
      .catch((err) =>
        res.status(400).json({
          message: "unable to add new user",
          error: err.message,
        })
      );
  } catch {}
};

exports.userLogin = async (req, res) => {
  console.log("user login");
  const query = { userName: req.body.username };

  Users.findOne(query)
    .then((data) => {
      if (data) {
        const auth = bcrypt.compareSync(req.body.password, data.password);
        if (auth) {
          res.json({ message: "Authentication Success", data });
        } else {
          res.status(400).json({
            message: "Authentication Failed",
          });
        }
      } else {
        res.status(400).json({
          message: "No such user",
        });
      }
    })
    .catch((err) =>
      res.status(400).json({
        message: "unable to add new user",
        error: err.message,
      })
    );
};

exports.updateUser = (req, res) => {
  console.log("id: ", req.params.id);
  console.log("body: ", req.body);
  Users.findByIdAndUpdate(req.params.id, req.body)
    .then((user) => {
      console.log("edit", { user });
      return res.json({ message: "updated successfully", user });
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
        res.status(404).json({ error: "book not found", message: err.message })
      )
  );
};
