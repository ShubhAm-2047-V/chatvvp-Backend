const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['search', 'ai_chat', 'ai_explain'],
    required: true
  },
  query: String, // Search keywords or prompts
  subject: String,
  topic: String,
  response: String, // Optional: store AI response snippet
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Activity', ActivitySchema);
