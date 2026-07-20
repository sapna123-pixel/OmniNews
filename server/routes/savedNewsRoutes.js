const express = require("express");
const router = express.Router();

const SavedNews = require("../models/SavedNews");

// Save a news article
router.post("/", async (req, res) => {
  try {
    const savedArticle = new SavedNews(req.body);

    await savedArticle.save();

    res.status(201).json({
      message: "News saved successfully",
      article: savedArticle,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to save news",
    });
  }
});

// Get all saved news
router.get("/", async (req, res) => {
  try {
    const savedNews = await SavedNews.find().sort({ createdAt: -1 });

    res.json(savedNews);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to fetch saved news",
    });
  }
});




// Delete saved news
router.delete("/:id", async (req, res) => {
  try {
    await SavedNews.findByIdAndDelete(req.params.id);

    res.json({
      message: "News deleted successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to delete news",
    });
  }
});

module.exports = router;