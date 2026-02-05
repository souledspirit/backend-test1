const mongoose = require("mongoose");
const dbURI = "mongodb://127.0.0.1:27017/test1";
mongoose
  .connect(dbURI)
  .then(() => console.log("MongoDB connected successfully✅"))
  .catch((err) => console.log("MongoDB connection error: ", err));
module.exports = mongoose;
