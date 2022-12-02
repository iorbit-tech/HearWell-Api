const { v4: uuidv4 } = require("uuid");
const Users = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

    Users.findOne({ email: req.body.email }).then((data) => {
      if (data == null) {
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
        console.log("user does not exist");
      } else {
        res.status(403).json({
          message: " User with same email already exist. Please sign in",
        });

        console.log("user exist");
      }
    });
  } catch {}
};

exports.userLogin = async (req, res) => {
  const query = { email: req.body.email };
  console.log("user login :", query);

  Users.findOne(query)
    .then((data) => {
      if (data) {
        const auth = bcrypt.compareSync(req.body.password, data.password);
        if (auth) {
          const token = jwt.sign({ data }, "secretKey");
          res.json({
            message: "Authentication Success",
            token: token,
            data: [data],
          });
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
        message: "unable to login",
        error: err.message,
      })
    );
};

exports.updateUser = (req, res) => {
  console.log("id: ", req.params.id);
  console.log("body: ", req.body);
  Users.findOneAndUpdate({ userId: req.params.id }, { ...req.body })
    .then((user) => {
      console.log("edit", { user });
      return res.json({ message: "updated successfully", user });
    })
    .catch((err) => {
      res
        .status(400)
        .json({ error: "unable to update user", message: err.message });
    });

  // Users.findByIdAndUpdate(req.params.id, req.body)
  //   .then((user) => {
  //     console.log("edit", { user });
  //     return res.json({ message: "updated successfully", user });
  //   })
  //   .catch((err) =>
  //     res
  //       .status(400)
  //       .json({ error: "unable to update user", message: err.message })
  //   );
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
