const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const progressSchema = new mongoose.Schema({
  conceptId: String,
  topicId: String,
  completedAt: { type: Date, default: Date.now },
});

const quizAttemptSchema = new mongoose.Schema({
  conceptId: String,
  topicId: String,
  correct: Boolean,
  answeredAt: { type: Date, default: Date.now },
});

const userSchema = new mongoose.Schema(
  {
    // ── Identity ────────────────────────────────────────
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [50, 'Name cannot exceed 50 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      validate: [validator.isEmail, 'Please provide a valid email'],
    },
    password: {
      type: String,
      minlength: [8, 'Password must be at least 8 characters'],
      select: false, // never returned in queries by default
    },
    avatar: { type: String, default: '' },

    // ── OAuth ────────────────────────────────────────────
    googleId: { type: String, sparse: true },
    authProvider: { type: String, enum: ['local', 'google'], default: 'local' },

    // ── Refresh tokens (rotation) ────────────────────────
    refreshTokens: [{ type: String, select: false }],

    // ── Learning Progress ────────────────────────────────
    completedConcepts: [progressSchema],
    completedTopics: [{ type: String }],

    // ── Quiz Stats ───────────────────────────────────────
    quizAttempts: [quizAttemptSchema],
    quizCorrect: { type: Number, default: 0 },
    quizTotal: { type: Number, default: 0 },

    // ── Flash Cards ──────────────────────────────────────
    flashCardsSeen: [{ type: Number }],

    // ── Streak ───────────────────────────────────────────
    streak: { type: Number, default: 0 },
    lastActiveDate: { type: String, default: null }, // 'YYYY-MM-DD'
    activityLog: { type: Map, of: Number, default: {} },

    // ── Account ──────────────────────────────────────────
    isVerified: { type: Boolean, default: false },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// ── Virtuals ─────────────────────────────────────────────────────────
userSchema.virtual('quizAccuracy').get(function () {
  if (this.quizTotal === 0) return 0;
  return Math.round((this.quizCorrect / this.quizTotal) * 100);
});

userSchema.virtual('initials').get(function () {
  return this.name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
});

// ── Middleware ────────────────────────────────────────────────────────
userSchema.pre('save', async function (next) {
  if (!this.isModified('password') || !this.password) return next();
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// ── Methods ───────────────────────────────────────────────────────────
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.updateStreak = function () {
  const today = new Date().toISOString().slice(0, 10);
  if (this.lastActiveDate === today) return;

  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  if (this.lastActiveDate === yesterday) {
    this.streak = (this.streak || 0) + 1;
  } else if (!this.lastActiveDate) {
    this.streak = 1;
  } else {
    this.streak = 1; // streak broken
  }
  this.lastActiveDate = today;

  const log = this.activityLog || new Map();
  log.set(today, (log.get(today) || 0) + 1);
  this.activityLog = log;
};

userSchema.methods.toPublicJSON = function () {
  return {
    id: this._id,
    name: this.name,
    email: this.email,
    avatar: this.avatar,
    authProvider: this.authProvider,
    initials: this.initials,
    streak: this.streak,
    lastActiveDate: this.lastActiveDate,
    activityLog: Object.fromEntries(this.activityLog || new Map()),
    completedConcepts: this.completedConcepts,
    completedTopics: this.completedTopics,
    flashCardsSeen: this.flashCardsSeen,
    quizCorrect: this.quizCorrect,
    quizTotal: this.quizTotal,
    quizAccuracy: this.quizAccuracy,
    role: this.role,
    createdAt: this.createdAt,
  };
};

module.exports = mongoose.model('User', userSchema);
