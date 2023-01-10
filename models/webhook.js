const mongoose = require("mongoose");
mongoose.pluralize(null);
const WebhookSchema = new mongoose.Schema(
  {
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
     reply: {
      type: Boolean,
      //required: true,
    },
  },
  { timestamps: true }
);

const Webhook = mongoose.model("whatsapp-messages", WebhookSchema);

module.exports = Webhook;
