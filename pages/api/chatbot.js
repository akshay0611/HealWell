import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export default async function handler(req, res) {
  const { prompt } = req.body;

  // Check if the prompt is empty
  if (!prompt || prompt.trim() === "") {
    return res.status(400).json({ message: "Please provide a valid question or prompt." });
  }

  try {
    const result = await model.generateContent(prompt);
    
    // Return the response without the prefix
    res.status(200).json({
      text: result.response.text(),
    });
  } catch (error) {
    // Provide a friendly error message
    res.status(500).json({
      message: "Oops! Something went wrong. Please try again later.",
      error: error.message,
    });
  }
}