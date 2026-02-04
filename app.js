const express = require("express");
const path = require("path");
const app = express();
const port = 3000;
const fs = require("fs");
const morgan = require("morgan");
const cors = require("cors");
app.use(morgan("dev"));

const logger = (req, res, next) => {
  console.log(`${req.method}  request to ${req.url}`);
  next();
};

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/data", (req, res) => {
  res.header("Content-Type:application/json");
  res.status(200);
  res.json({ message: "this is the response form the server test 1" });
});

app.set("view engine", "ejs");

app.get("/home", (req, res) => {
  res.render("index");
});

app.get("/form", (req, res) => {
  res.render("form");
});
app.post("/api/submit-form", (req, res) => {
  const formData = req.body;
  res.render("sucess", { data: req.body });
});

app.post("/api/send-data", (req, res) => {
  const data = req.body;
  console.log(data);

  res.json({ message: "data received successfully" });
});

console.log(path.basename(__filename) + " is running...");
console.log("os.platform(): " + require("os").platform());
console.log();

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
