const express = require("express");
const app = express();

const path = require("path");
const logger = require("morgan");
const cors = require("cors");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

app.use("/user", require("./routes/user"));

app.use((req, res, next) => {
  res.status(404).json("not found");
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500);
  res.json({ error: err.message || "internal server error" });
});

module.exports = app;
