const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize Gemini AI with API Key from environment variables
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Use gemini-flash-latest for best performance/availability on this project's key
const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

/**
 * Explains study content in simple terms for diploma students.
 * @param {string} text - The content to be explained.
 * @returns {Promise<string>} - The simplified explanation.
 */
async function explainText(text) {
  if (!text || text.trim().length === 0) {
    throw new Error("Study content text is required for explanation");
  }

  try {
    const prompt = `Explain the following study content in simple terms for a diploma student. Keep it short:\n\n${text}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;

    return response.text();
  } catch (error) {
    console.error("AI Error:", error);
    // Determine if it's a quota error or something else
    if (error.message?.includes('429') || error.message?.includes('Quota')) {
        throw new Error("AI Quota exceeded. Please try again in a few minutes.");
    }
    throw new Error("AI explanation failed: " + error.message);
  }
}

/**
 * Simple chat function for general AI interaction.
 */
async function chatWithAI(prompt, history = []) {
    try {
        const chat = model.startChat({
            history: history.map(msg => ({
                role: msg.role === 'user' ? 'user' : 'model',
                parts: [{ text: msg.text }]
            })),
            generationConfig: { maxOutputTokens: 500 },
        });

        const systemInstruction = "You are a helpful AI Tutor. Answer clearly and concisely.";
        const result = await chat.sendMessage(`${systemInstruction}\n\nStudent: ${prompt}`);
        const response = await result.response;
        return response.text().trim();
    } catch (error) {
        console.error("AI Chat Error:", error);
        throw new Error("AI Chat failed");
    }
}

module.exports = { 
    explainText,
    chatWithAI 
};
