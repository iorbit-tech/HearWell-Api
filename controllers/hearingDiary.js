const { v4: uuidv4 } = require("uuid");
const HearingDairy = require("../models/hearingDiary");
const bcrypt = require("bcrypt");

exports.getUsersNotes = (req, res) => {
    const query = { userId: req.params.id };

  HearingDairy.find(query)
    .then((notes) => {
      console.log({ notes });
      res.json(notes);
    })
    .catch((err) =>
      res.status(404).json({ message: "no notes found", error: err.message })
    );
};


exports.getNotesById = (req, res) => {
  const query = { noteId: req.params.id };
  console.log(req.params.id);

HearingDairy.findOne(query)
  .then((notes) => {
    console.log({ notes });
    res.json(notes);
  })
  .catch((err) =>
    res.status(404).json({ message: "no notes found", error: err.message })
  );
};


exports.createNote = async (req, res) => {
  try {
    // hashPassword = await bcrypt.hash(req.body.password, 10);
    req.body.noteId = uuidv4();
    // req.body.password = hashPassword;
    // console.log(hashPassword);
    HearingDairy.create(req.body)
      .then((data) => {
        console.log({ data });
        res.json({ message: "Note registration successfull", data });
      })
      .catch((err) =>
        res.status(400).json({
          message: "unable to add new note",
          error: err.message,
        })
      );
  } catch {}
};

// exports.userLogin = async (req, res) => {
//   console.log("user login");
//   const query = { userName: req.body.username };

//   Users.findOne(query)
//     .then((data) => {
//       if (data) {
//         const auth = bcrypt.compareSync(req.body.password, data.password);
//         if (auth) {
//           res.json({ message: "Authentication Success", data });
//         } else {
//           res.status(400).json({
//             message: "Authentication Failed",
//           });
//         }
//       } else {
//         res.status(400).json({
//           message: "No such user",
//         });
//       }
//     })
//     .catch((err) =>
//       res.status(400).json({
//         message: "unable to add new user",
//         error: err.message,
//       })
//     );
// };

// exports.updateUser = (req, res) => {
//   console.log("id: ", req.params.id);
//   console.log("body: ", req.body);
//   Users.findOneAndUpdate({ _id:req.params.id }, {lastName:"King",firstName:"Randy"})
//     .then((user) => {
//       console.log("edit", { user });
//       return res.json({ message: "updated successfully", user });
//     })
//     .catch((err) => {
//       res
//         .status(400)
//         .json({ error: "unable to update user", message: err.message });
//     });

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
//};

// exports.deleteTodo = (req, res) => {
//   Todo.findByIdAndRemove(req.params.id, req.body).then((data) =>
//     res
//       .json({ message: "todo deleted successfully", data })
//       .catch((err) =>
//         res.status(404).json({ error: "book not found", message: err.message })
//       )
//   );
// };
