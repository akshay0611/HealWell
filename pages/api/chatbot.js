import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Add website-specific context
const WEBSITE_CONTEXT = `
This website, "Heal Well," is a health and wellness platform based in New Delhi. 
It provides tools to book appointments, access medical resources, and connect with healthcare professionals.
The chatbot answers health-related queries and assists users in navigating the website.
`;

export default async function handler(req, res) {
  const { prompt } = req.body;

  // Check if the prompt is empty
  if (!prompt || prompt.trim() === "") {
    return res.status(400).json({ message: "Please provide a valid question or prompt." });
  }

  try {
    // Check if the user query is website-specific
    const isWebsiteQuery = checkIfWebsiteQuery(prompt);

    let responseText;

    if (isWebsiteQuery) {
      // Handle website-specific queries directly
      responseText = handleWebsiteQuery(prompt);
    } else {
      // Combine website context with user query
      const fullPrompt = `${WEBSITE_CONTEXT}\n\nUser: ${prompt}\n\nAI:`;
      const result = await model.generateContent(fullPrompt, {
        maxOutputTokens: 500, // Adjust as needed
      });

      // Get the full response
      responseText = await result.response.text();
    }

    // Process the response to make it concise
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
  const lines = responseText.split('\n').map((line) => line.trim());
  const maxLines = 5; // Limit the response to 5 lines
  let conciseResponse = lines.slice(0, maxLines).join(' ');

  // Remove bold formatting (e.g., **text**) throughout the response
  conciseResponse = conciseResponse.replace(/\*\*(.*?)\*\*/g, '$1'); // Removes double asterisks **

  // Remove numbering patterns like "1. " or "2. " if not needed
  conciseResponse = conciseResponse.replace(/^\d+\.\s*/g, ''); // Removes leading "1. ", "2. ", etc.

  return conciseResponse;
}

// Function to check if the user query is website-specific
function checkIfWebsiteQuery(prompt) {
  const keywords = ["website", "about", "services", "platform", "how to use", "what is"];
  return keywords.some((keyword) => prompt.toLowerCase().includes(keyword));
}

// Function to handle website-specific queries
function handleWebsiteQuery(prompt) {
  if (prompt.toLowerCase().includes("website")) {
    return `This website, "Heal Well," is a health and wellness platform that helps users book appointments, access medical resources, and connect with doctors.`;
  }
  if (prompt.toLowerCase().includes("services")) {
    return `"Heal Well" offers appointment booking, health tips, and resources for patients to connect with healthcare professionals.`;
  }
  if (prompt.toLowerCase().includes("how to")) {
    return `You can navigate the website by using the menu to explore sections like Appointments, Resources, and Contact Us.`;
  }
  return `Heal Well is a platform for health and wellness services based in New Delhi.`;
}