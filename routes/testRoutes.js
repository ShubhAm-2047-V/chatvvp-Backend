const express = require('express');
const router = express.Router();

router.get('/test', (req, res) => {
  res.json({ message: 'API working' });
});

// @route   GET /api/test-ai
router.get('/test-ai', async (req, res) => {
    try {
        const { explainText } = require('../services/aiService');
        const sampleText = "Photosynthesis is the process by which green plants and some other organisms use sunlight to synthesize foods from carbon dioxide and water. Photosynthesis in plants generally involves the green pigment chlorophyll and generates oxygen as a byproduct.";
        const result = await explainText(sampleText);
        res.json({
            status: "success",
            sample_text: sampleText,
            explanation: result
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
