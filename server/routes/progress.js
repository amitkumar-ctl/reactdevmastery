const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const User = require('../models/User');

// All routes require authentication
router.use(protect);

// ── GET /api/progress ─────────────────────────────────────────────────
// Get full user progress
router.get('/', async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    res.json({ success: true, progress: user.toPublicJSON() });
  } catch (err) {
    next(err);
  }
});

// ── POST /api/progress/concept ────────────────────────────────────────
// Mark a concept as completed
router.post('/concept', async (req, res, next) => {
  try {
    const { conceptId, topicId } = req.body;
    if (!conceptId || !topicId) {
      return res.status(400).json({ message: 'conceptId and topicId are required' });
    }

    const user = await User.findById(req.user._id);
    const alreadyDone = user.completedConcepts.some((c) => c.conceptId === conceptId);

    if (!alreadyDone) {
      user.completedConcepts.push({ conceptId, topicId });
      user.updateStreak();
    }

    user.activityLog = user.activityLog || new Map();
    const today = new Date().toISOString().slice(0, 10);
    user.activityLog.set(today, (user.activityLog.get(today) || 0) + 1);

    await user.save();
    res.json({ success: true, user: user.toPublicJSON() });
  } catch (err) {
    next(err);
  }
});

// ── POST /api/progress/topic ──────────────────────────────────────────
// Mark a topic as fully completed
router.post('/topic', async (req, res, next) => {
  try {
    const { topicId } = req.body;
    if (!topicId) return res.status(400).json({ message: 'topicId is required' });

    const user = await User.findById(req.user._id);
    if (!user.completedTopics.includes(topicId)) {
      user.completedTopics.push(topicId);
      user.updateStreak();
      await user.save();
    }

    res.json({ success: true, user: user.toPublicJSON() });
  } catch (err) {
    next(err);
  }
});

// ── POST /api/progress/quiz ───────────────────────────────────────────
// Record a quiz attempt
router.post('/quiz', async (req, res, next) => {
  try {
    const { conceptId, topicId, correct } = req.body;
    if (conceptId === undefined || correct === undefined) {
      return res.status(400).json({ message: 'conceptId and correct are required' });
    }

    const user = await User.findById(req.user._id);
    user.quizAttempts.push({ conceptId, topicId, correct });
    if (correct) user.quizCorrect += 1;
    user.quizTotal += 1;
    user.updateStreak();
    await user.save();

    res.json({
      success: true,
      stats: {
        quizCorrect: user.quizCorrect,
        quizTotal: user.quizTotal,
        quizAccuracy: user.quizAccuracy,
      },
    });
  } catch (err) {
    next(err);
  }
});

// ── POST /api/progress/flash ──────────────────────────────────────────
// Mark flash cards as seen
router.post('/flash', async (req, res, next) => {
  try {
    const { indices } = req.body; // array of numbers
    if (!Array.isArray(indices)) {
      return res.status(400).json({ message: 'indices must be an array' });
    }

    const user = await User.findById(req.user._id);
    const current = new Set(user.flashCardsSeen);
    indices.forEach((i) => current.add(Number(i)));
    user.flashCardsSeen = [...current];
    user.updateStreak();
    await user.save();

    res.json({ success: true, flashCardsSeen: user.flashCardsSeen });
  } catch (err) {
    next(err);
  }
});

// ── DELETE /api/progress/reset ────────────────────────────────────────
// Reset all progress (confirm before calling)
router.delete('/reset', async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    user.completedConcepts = [];
    user.completedTopics = [];
    user.quizAttempts = [];
    user.quizCorrect = 0;
    user.quizTotal = 0;
    user.flashCardsSeen = [];
    user.streak = 0;
    user.lastActiveDate = null;
    user.activityLog = new Map();
    await user.save();

    res.json({ success: true, message: 'Progress reset', user: user.toPublicJSON() });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
