const express = require("express");
const router = express.Router();

const SavedNews = require("../models/SavedNews");
const authMiddleware = require("../middleware/authMiddleware");


// Save a news article
router.post("/", authMiddleware, async (req, res) => {
  try {
    const savedArticle = new SavedNews({
      ...req.body,
      user: req.user.id,
    });

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



// Get logged-in user's saved news
router.get("/", authMiddleware, async (req, res) => {
  try {

    const savedNews = await SavedNews.find({
      user: req.user.id,
    }).sort({
      createdAt: -1,
    });

    res.json(savedNews);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to fetch saved news",
    });
  }
});




// Delete only user's saved news
router.delete("/:id", authMiddleware, async (req, res) => {
  try {

    await SavedNews.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });


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