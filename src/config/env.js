require("dotenv").config();

module.exports = {
 PORT: Number(process.env.PORT) || 5000,
 EMAIL: process.env.OFFICIAL_EMAIL || "",
 GEMINI: process.env.GEMINI_API_KEY || "",
 API_KEY: process.env.API_KEY || ""
};
