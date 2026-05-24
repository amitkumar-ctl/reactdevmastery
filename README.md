# ⚡ DevMastery — Senior Frontend Engineer Academy

A full-stack MERN learning platform with Email/Password auth + Google OAuth, AI-powered explanations, quizzes, code challenges, and per-user progress tracking.

---

## 🏗 Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React 18, React Router v6, CSS Modules |
| Backend | Node.js, Express 4 |
| Database | MongoDB + Mongoose |
| Auth | JWT (access + refresh tokens), Google OAuth 2.0 |
| AI | Anthropic Claude API (proxied through backend) |
| Security | Helmet, CORS, rate limiting, httpOnly cookies |

---

## 📁 Project Structure

```
devmastery/
├── server/                   # Express backend
│   ├── config/
│   │   ├── db.js             # MongoDB connection
│   │   └── jwt.js            # Token helpers
│   ├── middleware/
│   │   ├── auth.js           # JWT protect middleware
│   │   └── errorHandler.js   # Global error handler
│   ├── models/
│   │   └── User.js           # User schema with progress
│   ├── routes/
│   │   ├── auth.js           # /api/auth (register, login, google, refresh, logout)
│   │   ├── progress.js       # /api/progress (concept, topic, quiz, flash)
│   │   ├── users.js          # /api/users (profile, password, leaderboard)
│   │   └── ai.js             # /api/ai (proxies Anthropic API)
│   ├── index.js              # Server entry point
│   └── .env.example          # Environment variable template
│
└── client/                   # React frontend
    ├── src/
    │   ├── components/
    │   │   ├── auth/         # Login + Register pages + CSS
    │   │   └── layout/       # AppLayout sidebar + CSS
    │   ├── context/
    │   │   ├── AuthContext.js     # Global auth state
    │   │   └── ProgressContext.js # Learning progress state
    │   ├── data/
    │   │   └── courseData.js # All topics, concepts, quizzes, flashcards
    │   ├── pages/
    │   │   ├── Dashboard.jsx  # Home with stats, roadmap, activity
    │   │   ├── TopicPage.jsx  # Topic list + Concept detail (Learn/Quiz/Challenge/Chat)
    │   │   ├── FlashCards.jsx # Flip card drill with progress
    │   │   ├── Leaderboard.jsx# Global quiz leaderboard
    │   │   └── Profile.jsx    # Account settings + progress reset
    │   ├── utils/
    │   │   └── api.js         # Axios with auto token refresh interceptor
    │   └── App.js             # Routing + protected routes
    └── .env.example
```

---

## 🚀 Setup

### 1. Prerequisites
- Node.js 18+
- MongoDB (local or [Atlas](https://cloud.mongodb.com))
- Google Cloud Console project (for OAuth)
- Anthropic API key

---

### 2. Clone & Install

```bash
git clone <your-repo>
cd devmastery

# Install root, server, and client deps
npm run install:all
```

---

### 3. Configure environment variables

**Server** — copy and fill in:
```bash
cp server/.env.example server/.env
```

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/devmastery
JWT_SECRET=generate_with_node_crypto   # see below
JWT_REFRESH_SECRET=another_secret
GOOGLE_CLIENT_ID=your_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_secret
CLIENT_URL=http://localhost:3000
ANTHROPIC_API_KEY=sk-ant-...
```

Generate secrets:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

**Client** — copy and fill in:
```bash
cp client/.env.example client/.env
```

```env
REACT_APP_GOOGLE_CLIENT_ID=your_id.apps.googleusercontent.com
REACT_APP_API_URL=http://localhost:5000/api
```

---

### 4. Google OAuth Setup

1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Create a project → APIs & Services → Credentials
3. Create **OAuth 2.0 Client ID** (Web application)
4. Authorized JavaScript origins: `http://localhost:3000`
5. Authorized redirect URIs: `http://localhost:3000`
6. Copy Client ID → both `.env` files

---

### 5. Run in development

```bash
# From root — starts both server (5000) and client (3000)
npm run dev
```

Or separately:
```bash
cd server && npm run dev   # nodemon
cd client && npm start     # React dev server
```

---

### 6. Build for production

```bash
npm run build              # Builds React to client/build/

# Serve static files from Express (add to server/index.js):
# app.use(express.static(path.join(__dirname, '../client/build')));
# app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../client/build/index.html')));
```

---

## 🔐 Auth Flow

```
Register/Login  →  accessToken (15min, localStorage) + refreshToken (7d, httpOnly cookie)
Request         →  Bearer <accessToken> in Authorization header
Token expires   →  Axios interceptor auto-calls POST /api/auth/refresh
Refresh rotates →  Old token invalidated, new one issued
Logout          →  Token removed from DB + cookie cleared
```

**Security measures:**
- Passwords hashed with bcrypt (12 rounds)
- Refresh tokens stored hashed in DB (up to 5 per user)
- httpOnly cookies (XSS-safe refresh tokens)
- Rate limiting on auth endpoints (10 req / 15 min)
- Helmet for security headers
- CORS restricted to CLIENT_URL
- Request body limited to 10kb

---

## 🗄 MongoDB Schema

The `User` model stores everything per user:
- `completedConcepts[]` — with timestamps
- `completedTopics[]` — topic IDs
- `quizAttempts[]` — per attempt with correct/wrong
- `quizCorrect / quizTotal` — aggregate stats
- `flashCardsSeen[]` — card indices
- `streak / lastActiveDate / activityLog` — streaks and heatmap
- `refreshTokens[]` — for token rotation

---

## 📡 API Reference

| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| POST | /api/auth/register | ❌ | Email/password registration |
| POST | /api/auth/login | ❌ | Email/password login |
| POST | /api/auth/google | ❌ | Google ID token verification |
| POST | /api/auth/refresh | cookie | Rotate refresh token |
| POST | /api/auth/logout | ✅ | Clear session |
| GET | /api/auth/me | ✅ | Get current user |
| GET | /api/progress | ✅ | Get full progress |
| POST | /api/progress/concept | ✅ | Mark concept done |
| POST | /api/progress/topic | ✅ | Mark topic done |
| POST | /api/progress/quiz | ✅ | Record quiz attempt |
| POST | /api/progress/flash | ✅ | Mark flash cards seen |
| DELETE | /api/progress/reset | ✅ | Reset all progress |
| GET | /api/users/profile | ✅ | Get profile |
| PATCH | /api/users/profile | ✅ | Update name/avatar |
| PATCH | /api/users/password | ✅ | Change password |
| GET | /api/users/leaderboard | ✅ | Top 20 by quiz score |
| POST | /api/ai/chat | ✅ | Proxy to Anthropic API |

---

## 🎯 Features

- **20 topic modules** covering everything a senior frontend engineer needs
- **200+ concepts** with AI-generated explanations, code examples, interview tips
- **Quiz system** — pre-built + AI-generated questions, score tracking
- **Code challenge** — AI-generated, AI code review
- **AI chat tutor** — per-concept Q&A with context
- **Flash cards** — 12 high-frequency interview cards with flip animation
- **Daily streaks** + activity heatmap
- **Leaderboard** — global quiz rankings
- **Profile** — update name, change password, reset progress
- **Google OAuth** + email/password with refresh token rotation

---

## 🛠 Extending

**Add a new topic:**
1. Add to `TOPICS` array in `client/src/data/courseData.js`
2. Add to `CONCEPTS` object with items
3. Optionally add pre-built quizzes to `QUIZZES`
4. The route `/your-topic-id` is auto-created

**Add a new API route:**
1. Create `server/routes/yourRoute.js`
2. Register in `server/index.js`: `app.use('/api/your', require('./routes/yourRoute'))`

---

## 🚢 Deploy

**Backend:** Railway, Render, Heroku, or any Node.js host
**Frontend:** Vercel, Netlify, or serve static from Express
**Database:** MongoDB Atlas (free tier works great)

Set production env vars, update `CLIENT_URL` and `REACT_APP_API_URL`, and you're live.
