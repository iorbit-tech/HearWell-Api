const mongoose = require("mongoose");

const UserTypeSchema = new mongoose.Schema({
  typeId: {
    type: String,
    required: true,
  },

  typeName: {
    type: String,
    required: true,
  },
});

const UserType = mongoose.model("user-types", UserTypeSchema);

module.exports = UserType;
