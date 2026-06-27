const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const User = require('../models/User');

router.use(protect);

// ── GET /api/users/profile ────────────────────────────────────────────
router.get('/profile', async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    res.json({ success: true, user: user.toPublicJSON() });
  } catch (err) {
    next(err);
  }
});

// ── PATCH /api/users/profile ──────────────────────────────────────────
router.patch('/profile', async (req, res, next) => {
  try {
    const { name, avatar } = req.body;
    const updates = {};
    if (name && name.trim().length >= 2) updates.name = name.trim();
    if (avatar !== undefined) updates.avatar = avatar;

    const user = await User.findByIdAndUpdate(req.user._id, updates, {
      new: true,
      runValidators: true,
    });
    res.json({ success: true, user: user.toPublicJSON() });
  } catch (err) {
    next(err);
  }
});

// ── PATCH /api/users/password ─────────────────────────────────────────
router.patch('/password', async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: 'Both current and new password are required' });
    }
    if (newPassword.length < 8) {
      return res.status(400).json({ message: 'New password must be at least 8 characters' });
    }

    const user = await User.findById(req.user._id).select('+password');
    if (user.authProvider === 'google') {
      return res.status(400).json({ message: 'Google accounts cannot set a password here' });
    }

    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(401).json({ message: 'Current password is incorrect' });
    }

    user.password = newPassword;
    await user.save();
    res.json({ success: true, message: 'Password updated successfully' });
  } catch (err) {
    next(err);
  }
});

// ── POST /api/users/onboarding ───────────────────────────────────────
router.post('/onboarding', async (req, res, next) => {
  try {
    const { currentLevel, goal, dailyGoal } = req.body;

    const validLevels = ['junior', 'mid-early', 'mid-senior', 'senior'];
    const validGoals  = ['active-interview', 'future-interview', 'upskilling', 'gaps'];

    if (!validLevels.includes(currentLevel)) {
      return res.status(400).json({ message: 'Invalid level' });
    }
    if (!validGoals.includes(goal)) {
      return res.status(400).json({ message: 'Invalid goal' });
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        currentLevel,
        goal,
        dailyGoal: [1, 3, 5, 10].includes(Number(dailyGoal)) ? Number(dailyGoal) : 3,
        onboardingCompleted: true,
      },
      { new: true, runValidators: true }
    );

    res.json({ success: true, user: user.toPublicJSON() });
  } catch (err) {
    next(err);
  }
});

// ── GET /api/users/leaderboard ────────────────────────────────────────
router.get('/leaderboard', async (req, res, next) => {
  try {
    const users = await User.find({}, 'name avatar quizCorrect quizTotal completedTopics streak')
      .sort({ quizCorrect: -1 })
      .limit(20);

    const board = users.map((u) => ({
      id: u._id,
      name: u.name,
      avatar: u.avatar,
      initials: u.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2),
      quizCorrect: u.quizCorrect,
      quizTotal: u.quizTotal,
      accuracy: u.quizTotal > 0 ? Math.round((u.quizCorrect / u.quizTotal) * 100) : 0,
      topicsCompleted: u.completedTopics.length,
      streak: u.streak,
    }));

    res.json({ success: true, leaderboard: board });
  } catch (err) {
    next(err);
  }
});

module.exports = router;