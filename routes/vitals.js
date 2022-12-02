const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const authToken = require("../authToken");

const {
  getAllVitals,
  createVitals,
  getUsersVitals,
  getVitalsById,
  updateVitals,
  deleteVital,
} = require("../controllers/vitals");


router.get("/", authToken, getAllVitals);
router.post("/", authToken, createVitals);
router.put("/:id", authToken, updateVitals);
router.get("/userid/:id", authToken, getUsersVitals);
router.get("/vitalid/:id", authToken, getVitalsById);
router.delete("/vitalid/:id", authToken, deleteVital);

module.exports = router;
