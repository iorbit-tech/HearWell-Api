const express = require("express");
const router = express.Router();
const authToken = require("../authToken");
const { createChat, getCahtById } = require("../controllers/chatMessages");

router.post("/", authToken, createChat);
router.get("/:id", authToken, getCahtById);
// router.get("/noteid/:id", authToken, getNotesById);

module.exports = router;
