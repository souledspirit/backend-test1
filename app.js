const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/data", (req, res) => {
  res.header("Content-Type:application/json");
  res.status(200);
  res.json({ message: "this is the response form the server test 1" });
});

app.post("/api/send-data", (req, res) => {
  res.header("Content-Type:application/json");
  res.status(200);
  res.json({ message: "data received sucessfully" });
});
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
