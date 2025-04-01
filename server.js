const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const postRoutes = require("./post/routes/postRoute");
const connectDB = require("./config/db.js");
const dotenv = require("dotenv");

dotenv.config();
connectDB();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.use("/api/posts", postRoutes);


app.get("/ping", (req, res) => {
  res.status(200).send("ALive");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);
