const mongoose = require("mongoose");

const HealthCondition = new mongoose.Schema({
  diabets: {
    type: Boolean,
  },
  hyperTension: {
    type: Boolean,
  },
});

const VitalsSchema = new mongoose.Schema(
  {
    currentHealthStatus: {
      type: String,
      required: true,
    },
    healthCondition: [HealthCondition],
    name: {
      type: String,
      required: true,
    },
    yearOfBirth: {
      type: String,
    },
    otherHC: {
      type: String,
    },
    hearingAidUser: {
      type: Boolean,
    },
    userId: {
      type: String,
    },
  },
  { timestamps: true }
);

const Vitals = mongoose.model("basic-vitals", VitalsSchema);

module.exports = Vitals;
