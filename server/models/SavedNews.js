const mongoose = require("mongoose");

const savedNewsSchema = new mongoose.Schema(
  {

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

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