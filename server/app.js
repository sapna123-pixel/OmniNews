const connectDB = require("./config/db");

const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

connectDB();

const summaryRoutes = require("./routes/summaryRoutes");
const savedNewsRoutes = require("./routes/savedNewsRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());


// Routes
app.use("/api/summary", summaryRoutes);
app.use("/api/saved-news", savedNewsRoutes);
app.use("/api/auth", authRoutes);


// Test Route
app.get("/", (req, res) => {
  res.json({
    message: "OmniNews Backend is running successfully!"
  });
});


// News Route (Global News)
app.get("/api/news", async (req, res) => {
  try {
    const category = req.query.category || "general";

    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines?category=${category}&language=en&pageSize=20&apiKey=${process.env.NEWS_API_KEY}`
    );

    res.json(response.data);

  } catch (error) {
    console.log("News API Error:", error.message);

    res.status(500).json({
      message: "Failed to fetch news",
    });
  }
});


// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});