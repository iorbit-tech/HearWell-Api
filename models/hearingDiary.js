const mongoose = require("mongoose");
mongoose.pluralize(null);
const HearingDiarySchema = new mongoose.Schema(
  {
    noteId: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },
    note: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const HearingDairy = mongoose.model("hearing-diary", HearingDiarySchema);

module.exports = HearingDairy;
