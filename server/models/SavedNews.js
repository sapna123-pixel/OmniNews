const mongoose = require("mongoose");

const savedNewsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    image: String,
    source: String,
    publishedAt: String,
    url: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("SavedNews", savedNewsSchema);