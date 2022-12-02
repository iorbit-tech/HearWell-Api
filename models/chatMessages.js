const mongoose = require("mongoose");
mongoose.pluralize(null);
const ChatMessageSchema = new mongoose.Schema({
  messageId: {
    type: String,
    required: true,
  },
  senderId: {
    type: String,
    // required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  sentTime: {
    type: Date,
    // required: true,
  },
  recievedTime: {
    type: Date,
    // required: true,
  },
  receiverId: {
    type: String,
    // required: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
});

const ChatMessage = mongoose.model("chat-message", ChatMessageSchema);

module.exports = ChatMessage;
