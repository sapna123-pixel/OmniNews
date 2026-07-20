const connectDB = require("./config/db");

const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();
connectDB();

const summaryRoutes = require("./routes/summaryRoutes");
const savedNewsRoutes = require("./routes/savedNewsRoutes");

console.log(process.env.NEWS_API_KEY);

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/summary", summaryRoutes);
app.use("/api/saved-news", savedNewsRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "OmniNews Backend is running successfully!"
  });
});


app.get("/api/news", async (req, res) => {
  try {
    const category = req.query.category || "general";

    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${process.env.NEWS_API_KEY}`
    );

    res.json(response.data);

  } catch (error) {
    console.log(error.message);

    res.status(500).json({
      message: "Failed to fetch news",
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});