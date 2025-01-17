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

    // Get the full response
    let responseText = await result.response.text();

    // Process the response to make it concise and remove specific emphasis
    const processedText = processResponse(responseText);

    // Return the processed response
    res.status(200).json({
      text: processedText,
    });
  } catch (error) {
    // Provide a friendly error message
    res.status(500).json({
      message: "Oops! Something went wrong. Please try again later.",
      error: error.message,
    });
  }
}

// Function to process and format the response
function processResponse(responseText) {
  // Shorten the response by limiting the number of lines
  const lines = responseText.split('\n').map(line => line.trim());
  const maxLines = 5; // Adjust this value as per your requirement
  let conciseResponse = lines.slice(0, maxLines).join(' ');

  // Remove bold formatting (e.g., **text**) throughout the response
  conciseResponse = conciseResponse.replace(/\*\*(.*?)\*\*/g, '$1'); // Removes double asterisks **

  // Remove numbering patterns like "1. " or "2. " if not needed
  conciseResponse = conciseResponse.replace(/^\d+\.\s*/g, ''); // Removes leading "1. ", "2. ", etc.

  return conciseResponse;
}