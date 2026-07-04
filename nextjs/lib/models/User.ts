import mongoose, { Schema, Document, Model } from 'mongoose';
import bcrypt from 'bcryptjs';

// ── Sub-schemas ────────────────────────────────────────────────────────
interface IProgress {
  conceptId: string;
  topicId: string;
  completedAt?: Date;
}

interface IQuizAttempt {
  conceptId: string;
  topicId: string;
  correct: boolean;
  answeredAt?: Date;
}

// ── User document interface ────────────────────────────────────────────
export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password?: string;
  avatar: string;
  googleId?: string;
  authProvider: 'local' | 'google';
  refreshTokens: string[];
  completedConcepts: IProgress[];
  completedTopics: string[];
  quizAttempts: IQuizAttempt[];
  quizCorrect: number;
  quizTotal: number;
  quizAccuracy: number; // virtual
  flashCardsSeen: number[];
  streak: number;
  lastActiveDate: string | null;
  activityLog: Map<string, number>;
  isVerified: boolean;
  role: 'user' | 'admin';
  onboardingCompleted: boolean;
  currentLevel: 'junior' | 'mid-early' | 'mid-senior' | 'senior' | null;
  goal: 'active-interview' | 'future-interview' | 'upskilling' | 'gaps' | null;
  dailyGoal: number;
  passwordResetToken?: string;
  passwordResetExpires?: number;
  createdAt: Date;
  updatedAt: Date;

  // Methods
  comparePassword(candidate: string): Promise<boolean>;
  updateStreak(): void;
  toPublicJSON(): Record<string, unknown>;
}

// ── Schema ─────────────────────────────────────────────────────────────
const progressSchema = new Schema<IProgress>({
  conceptId: String,
  topicId: String,
  completedAt: { type: Date, default: Date.now },
});

const quizAttemptSchema = new Schema<IQuizAttempt>({
  conceptId: String,
  topicId: String,
  correct: Boolean,
  answeredAt: { type: Date, default: Date.now },
});

const userSchema = new Schema<IUser>(
  {
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
    },
    password: { type: String, minlength: 8, select: false },
    avatar: { type: String, default: '' },
    googleId: { type: String, sparse: true },
    authProvider: { type: String, enum: ['local', 'google'], default: 'local' },
    refreshTokens: [{ type: String, select: false }],
    completedConcepts: [progressSchema],
    completedTopics: [{ type: String }],
    quizAttempts: [quizAttemptSchema],
    quizCorrect: { type: Number, default: 0 },
    quizTotal: { type: Number, default: 0 },
    flashCardsSeen: [{ type: Number }],
    streak: { type: Number, default: 0 },
    lastActiveDate: { type: String, default: null },
    activityLog: { type: Map, of: Number, default: {} },
    isVerified: { type: Boolean, default: false },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    onboardingCompleted: { type: Boolean, default: false },
    currentLevel: {
      type: String,
      enum: ['junior', 'mid-early', 'mid-senior', 'senior'],
      default: null,
    },
    goal: {
      type: String,
      enum: ['active-interview', 'future-interview', 'upskilling', 'gaps'],
      default: null,
    },
    dailyGoal: { type: Number, default: 3 },
    passwordResetToken: { type: String, select: false },
    passwordResetExpires: { type: Number, select: false },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// ── Virtuals ───────────────────────────────────────────────────────────
userSchema.virtual('quizAccuracy').get(function () {
  if (this.quizTotal === 0) return 0;
  return Math.round((this.quizCorrect / this.quizTotal) * 100);
});

// ── Middleware ─────────────────────────────────────────────────────────
userSchema.pre('save', async function () {
  if (!this.isModified('password') || !this.password) return;
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
});

// ── Methods ────────────────────────────────────────────────────────────
userSchema.methods.comparePassword = async function (candidate: string): Promise<boolean> {
  return bcrypt.compare(candidate, this.password);
};

userSchema.methods.updateStreak = function () {
  const today = new Date().toISOString().slice(0, 10);
  if (this.lastActiveDate === today) return;

  const yesterday = new Date(Date.now() - 86_400_000).toISOString().slice(0, 10);
  if (this.lastActiveDate === yesterday) {
    this.streak = (this.streak || 0) + 1;
  } else {
    this.streak = 1;
  }
  this.lastActiveDate = today;

  const log = this.activityLog || new Map<string, number>();
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
    initials: this.name.split(' ').map((w: string) => w[0]).join('').toUpperCase().slice(0, 2),
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
    onboardingCompleted: this.onboardingCompleted,
    currentLevel: this.currentLevel,
    goal: this.goal,
    dailyGoal: this.dailyGoal,
    createdAt: this.createdAt,
  };
};

// ── Model ──────────────────────────────────────────────────────────────
// Guard against model recompilation in hot-reload (serverless warm invocations)
const User: Model<IUser> =
  (mongoose.models.User as Model<IUser>) ||
  mongoose.model<IUser>('User', userSchema);

export default User;
