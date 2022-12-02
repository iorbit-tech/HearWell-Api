const jwt = require("jsonwebtoken");
require("dotenv").config();

const KEY = process.env.AUTH_TOKEN_SECRET
const authToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, "secretKey", (err, decoded) => {
    if (err) return res.status(500).send({ error: "Authentication Failed" });
    next();
  });
  console.log("Test middle ");
  //   next();
};

module.exports = authToken;
