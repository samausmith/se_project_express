const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");

const app = express();
const { PORT = 3001 } = process.env;
const mainRouter = require("./routes/index");

app.use(cors());

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("connected to mongoDB");
  })
  .catch(console.error);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use((req, res, next) => {
//   req.user = {
//     _id: "6780d5551dd815687b049cd0",
//   };
//   next();
// });

app.use("/", mainRouter);
