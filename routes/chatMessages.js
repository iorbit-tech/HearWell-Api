const express = require("express");
const router = express.Router();
const authToken = require("../authToken");
const {
  createChat,
  getCahtById,
  getCahtByStatus,
  updateStatus,
} = require("../controllers/chatMessages");

router.post("/", authToken, createChat);
router.put("/:id", authToken, updateStatus);

router.get("/status/get", authToken, getCahtByStatus);
router.get("/:id", authToken, getCahtById);
// router.get("/noteid/:id", authToken, getNotesById);

module.exports = router;
