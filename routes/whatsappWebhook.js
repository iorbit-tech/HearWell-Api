const express = require("express");
const router = express.Router();
const authToken = require("../authToken");
const {
  getWebhook,
  postWebhook,
  testHook,
} = require("../controllers/whatsappWebhook");

router.get("/webhook", getWebhook);
router.post("/webhook", postWebhook);
router.post("/test", testHook);

// router.get("/:id", authToken, getCahtById);
// router.get("/noteid/:id", authToken, getNotesById);

module.exports = router;
