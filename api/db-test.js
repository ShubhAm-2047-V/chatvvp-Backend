const mongoose = require("mongoose");

module.exports = async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (!process.env.MONGODB_URI) {
      return res.status(500).json({
        error: "MONGODB_URI is missing"
      });
    }

    // Direct connect as requested
    await mongoose.connect(process.env.MONGODB_URI);

    return res.status(200).json({
      message: "MongoDB connected ✅"
    });
  } catch (error) {
    console.error("DB ERROR:", error);

    return res.status(500).json({
      error: error.message
    });
  }
};
