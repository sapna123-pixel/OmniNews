const express = require("express");
const OpenAI = require("openai");

const router = express.Router();


const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});


router.post("/", async (req, res) => {

  try {

    const { article } = req.body;

    console.log("Article received:", article);


    const completion = await client.chat.completions.create({

      model: "llama-3.3-70b-versatile",

      messages: [
        {
          role: "system",
          content: "You are a helpful news summarizer."
        },
        {
          role: "user",
          content: `
Summarize this news article in simple words.

Title:
${article.title}

Description:
${article.description}

Give a short summary in 3-4 sentences.
`
        }
      ]

    });


    const summary = completion.choices[0].message.content;


    res.json({
      summary: summary
    });


  } catch (error) {

    console.log(error.message);

    res.status(500).json({
      message: "AI summary generation failed"
    });

  }

});


module.exports = router;