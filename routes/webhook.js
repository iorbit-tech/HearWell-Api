const express = require("express"),
  body_parser = require("body-parser"),
  axios = require("axios");
const router = express.Router();
const authToken = require("../authToken");
const {
  testHook,
  getWhatsapp,
  postWhatsapp,
  getUnreadMessages,
  updateWhatsapp,
  sendMessage,
  getMessagesByFrom,
} = require("../controllers/webhook");

router.get("/webhook", testHook);
router.post("/send", sendMessage);
router.get("/unread", getUnreadMessages);
router.get("/", getWhatsapp);
router.post("/", postWhatsapp);
router.put("/:id", updateWhatsapp);
router.get("/from/:id", getMessagesByFrom);

//router.get("/:id", authToken, getCahtById);
// router.get("/noteid/:id", authToken, getNotesById);

module.exports = router;
