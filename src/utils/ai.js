const axios = require("axios");

module.exports = async (question) => {
 try {
  const response = await axios.post(
   `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
   {
    contents: [
     {
      parts: [
       {
        text: `Reply with EXACTLY ONE WORD. No punctuation. Question: ${question}`
       }
      ]
     }
    ],
    generationConfig: {
      temperature: 0,
      maxOutputTokens: 5
    }
   },
   {
    timeout: 4000
   }
  );

  const text =
   response.data?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!text) return "unknown";

  return text
   .trim()
   .replace(/[^a-zA-Z]/g, "")
   .split(/\s+/)[0] || "unknown";

 } catch (err) {
  console.log("Gemini error:", err.response?.data || err.message);
  return "unknown";
 }
};
