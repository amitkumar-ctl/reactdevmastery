const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const { protect } = require('../middleware/auth');

// Rate limit AI calls: 30 per minute per user
const aiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  keyGenerator: (req) => req.user?._id?.toString() || req.ip,
  message: { message: 'Too many AI requests — slow down a bit!' },
});

router.use(protect);
router.use(aiLimiter);

// ── POST /api/ai/chat ─────────────────────────────────────────────────
router.post('/chat', async (req, res, next) => {
  try {
    const { messages, max_tokens = 800 } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ message: 'messages array is required' });
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: Math.min(max_tokens, 1500), // cap at 1500
        messages,
      }),
    });

    if (!response.ok) {
      const err = await response.json();
      return res.status(response.status).json({ message: err.error?.message || 'AI error' });
    }

    const data = await response.json();
    res.json({ success: true, content: data.content });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
