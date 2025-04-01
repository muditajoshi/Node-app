const mongoose = require("mongoose");
const chalk = require("chalk");
const dotenv = require("dotenv");

const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGODB_URI, {
        socketTimeoutMS: 45000, 
        retryWrites: true, 
      }).then((res) =>
        console.log(
          `MongoDB Connected: ${res.connection.host}`
        )
      )
  } catch (error) {
    console.error("MongoDB connection failed", error);
    process.exit(1);
  }
};

module.exports = connectDB;
