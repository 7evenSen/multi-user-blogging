//this to creata a post model
const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
  },
  { timestamps: true } // adds createdAt and updatedAt
);

module.exports = mongoose.model("Post", PostSchema);