const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: String, 
    },
    tags: {
      type: [String], 
      default: [],
    },
    status: {
      type: String,
      enum: ["draft", "published"], 
      default: "draft",
    },
  },
  { timestamps: true } 
);

module.exports = mongoose.model("Post", postSchema);
