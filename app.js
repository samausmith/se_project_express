const express = require("express");
const mongoose = require("mongoose");
const app = express();
const { PORT = 3001 } = process.env;
const mainRouter = require("./routes/index");

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("connected to mongoDB");
  })
  .catch(console.error);

app.use(express.json());
app.use("/", mainRouter);
app.use((req, res, next) => {
  req.user = {
    _id: "677ba17fdc1fd787801bba6f",
  };
  next();
});
