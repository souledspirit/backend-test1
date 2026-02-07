const express = require("express");
const path = require("path");
const app = express();
const port = 3000;
const fs = require("fs");
const morgan = require("morgan");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jsonWebToken = require("jsonwebtoken");
app.use(morgan("dev"));

const db = require("./config/db");
const User = require("./models/user");
app.use(cors());

const logger = (req, res, next) => {
  console.log(`${req.method}  request to ${req.url}`);
  next();
};

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger);

app.get("/", (req, res) => {
  res.render("home.ejs");
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

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/api/login-check", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid email or password" });
    } else {
      res.status(200).json({ message: "Login successful" });
      res.redirect("/");
    }
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
    res.redirect("/login");
  }
});

app.post("/api/submit-form", (req, res) => {
  const formData = req.body;
  res.render("sucess", { data: req.body });
});

app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve users" });
  }
});

app.get("/update", async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { user: "test@example1.com" },
      { email: "john_updated@example.com" },
    );
    res.send(`User updated: ${user}`);
  } catch (error) {
    res.status(500).json({ error: "Failed to update user" });
  }
});

app.post("/api/sign-up", async (req, res) => {
  const data = req.body;
  console.log(data);
  const hashedPassword = await bcrypt.hash(data.password, 10);
  const user = new User({
    user: data.name,
    email: data.email,
    password: hashedPassword,
  });

  try {
    await user.save();
    res.status(201);
    res.redirect("/login");
  } catch (error) {
    res.status(500).json({ error: "Failed to save user data" });
  }
});

console.log(path.basename(__filename) + " is running...");
console.log("os.platform(): " + require("os").platform());
console.log();

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
