const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const PORT = process.env.PORT | 8080;

app.use(
  cors({
    origin: "*",
  }),
);

app.get("/", (req, res) => {
  return res.status(200).json({ message: "Welcome to AssistGo's API!" });
});

app.listen(PORT, () => {
  console.log(`AssistGo server running on port ${PORT}`);
});
