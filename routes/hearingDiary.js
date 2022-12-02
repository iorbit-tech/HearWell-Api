const express = require("express");
const router = express.Router();
const authToken = require("../authToken");
const {
  createNote,
  getUsersNotes,
  getNotesById,
} = require("../controllers/hearingDiary");

router.post("/", authToken, createNote);
router.get("/userid/:id", authToken, getUsersNotes);
router.get("/noteid/:id", authToken, getNotesById);

module.exports = router;