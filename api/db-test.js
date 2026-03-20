const mongoose = require('mongoose');

let isConnected = false;

async function connectDB() {
  if (isConnected) return;

  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI not found in environment variables');
  }

  // Note: useNewUrlParser and useUnifiedTopology are no longer needed in Mongoose 6+
  // but kept here for compatibility with older mongoose versions if present.
  await mongoose.connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 5000,
  });

  isConnected = true;
  console.log('MongoDB connected successfully ✅');
}

module.exports = async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    await connectDB();
    return res.status(200).json({
      message: 'MongoDB connected successfully ✅',
      status: 'connected',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('DB ERROR:', error);
    return res.status(500).json({
      error: error.message,
      status: 'failed'
    });
  }
};
