const mongoose = require("mongoose");
mongoose.pluralize(null);
const WhatsAppMessageSchema = new mongoose.Schema({
  messageId: {
    type: String,
    required: true,
  },
  phoneNumberId: {
    type: String,
    // required: true,
  },
  from: {
    type: String,
    //required: true,
  },
  messageBody: {
    type: String,
    required: true,
  },
  profileName: {
    type: String,
    // required: true,
  },
  recievedTime: {
    type: Date,
    // required: true,
  },
  conversationId: {
    type: String,
    // required: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
});

const WhatsAppMessage = mongoose.model("chat-message", WhatsAppMessageSchema);

module.exports = WhatsAppMessage;
