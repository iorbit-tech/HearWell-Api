const ChatMessage = require("../models/chatMessages");
const { v4: uuidv4 } = require("uuid");

exports.getCahtById = (req, res) => {
  const query = {
    $or: [{ senderId: req.params.id }, { receiverId: req.params.id }],
  };

  ChatMessage.find(query)
    .then((question) => {
      console.log({ question });
      res.status(200).json(question);
    })
    .catch((err) =>
      res.status(404).json({ message: "no chat found", error: err.message })
    );
};

exports.getCahtByStatus = (req, res) => {
  console.log("inside");
  const query = {
    status: false,
  };
  console.log({ query });
  ChatMessage.find(query).sort({sentTime: -1})
    .then((question) => {
      console.log({ question });
      res.status(200).json(question);
    })
    .catch((err) =>
      res.status(404).json({ message: "no chat found", error: err.message })
    );
};

exports.createChat = async (req, res) => {
  try {
    req.body.status = false;
    req.body.messageId = uuidv4();
    console.log(req.body);
    // req.body.password = hashPassword;
    // console.log(hashPassword);
    ChatMessage.create(req.body)
      .then((data) => {
        console.log({ data });
        res.json({ message: "Message sent successfully", data });
      })
      .catch((err) =>
        res.status(400).json({
          message: "unable to send message",
          error: err.message,
        })
      );
  } catch {}
};

exports.updateStatus = (req, res) => {
  console.log("id: ", req.params.id);
  console.log("body: ", req.body);
  ChatMessage.findOneAndUpdate({ messageId: req.params.id }, { ...req.body })
    .then((user) => {
      console.log("edit", { user });
      return res.json({ message: "updated successfully", user });
    })
    .catch((err) => {
      res
        .status(400)
        .json({ error: "unable to update user", message: err.message });
    });
};
