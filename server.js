require("dotenv").config();
const express = require("express");
const cors = require("cors");
const body_parser = require("body-parser");
const connectDB = require("./config/db");

const app = express().use(body_parser.json());

// routes
const vitals = require("./routes/vitals");
const users = require("./routes/users");
const userType = require("./routes/userType");
const surveyQuestion = require("./routes/surveyQuestions");
const hearingDiary = require("./routes/hearingDiary");
const chatMessages = require("./routes/chatMessages");
const makeQuestions = require("./routes/makeQuestions");
const surveyAnswers = require("./routes/surveyAnswers");
const whatsappWebhook = require("./routes/whatsappWebhook");

// connect database
connectDB();

// cors
app.use(cors({ origin: true, credentials: true }));

// initialize middleware
//app.use(express.json({ extended: false }));
app.get("/", (req, res) => res.send("server is active"));

// use routes
app.use("/api/vitals", vitals);
app.use("/api/user", users);
app.use("/api/user-type", userType);
app.use("/api/survey-questions", surveyQuestion);
app.use("/api/hearing-diary", hearingDiary);
app.use("/api/chat", chatMessages);
app.use("/api/questions", makeQuestions);
app.use("/api/answers", surveyAnswers);
app.use("/api/whatsapp", whatsappWebhook);

// setting up port

const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});

const io = require("socket.io")(server, {
  cors: {
    pingTimeOut: 60000,
    origin: "http://localhost:3006",
  },
});

io.on("connection", (socket) => {
  console.log("connected to socket.io");

  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });
});
