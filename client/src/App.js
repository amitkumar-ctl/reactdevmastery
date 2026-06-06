import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ProgressProvider } from './context/ProgressContext';
import AppLayout from './components/layout/AppLayout';
import { LoginPage, RegisterPage } from './components/auth/AuthPages';
import Dashboard from './pages/Dashboard';
import { TopicPage, ConceptPage } from './pages/TopicPage';
import FlashCards from './pages/FlashCards';
import Leaderboard from './pages/Leaderboard';
import Profile from './pages/Profile';
import InterviewPrepPage from './pages/InterviewPrepPage';
import QuizPage from './pages/QuizPage';

// ── Protected Route ────────────────────────────────────────────────────
const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <LoadingScreen />;
  if (!user) return <Navigate to="/login" replace />;
  return (
    <ProgressProvider>
      <AppLayout>{children}</AppLayout>
    </ProgressProvider>
  );
};

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <LoadingScreen />;
  if (user) return <Navigate to="/" replace />;
  return children;
};

const LoadingScreen = () => (
  <div style={{
    height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
    background: '#0a0e1a', fontFamily: 'Fira Code, monospace',
    flexDirection: 'column', gap: 16,
  }}>
    <div style={{ fontSize: 32 }}>⚡</div>
    <div style={{ color: '#9ca3af', fontSize: 13, letterSpacing: 2 }}>LOADING...</div>
  </div>
);

const App = () => (
  <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || 'placeholder'}>
    <AuthProvider>
      <BrowserRouter>
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#111827',
              color: '#e2e8f0',
              border: '1px solid #1e2d40',
              fontFamily: 'Fira Code, monospace',
              fontSize: '13px',
            },
            success: { iconTheme: { primary: '#00ff88', secondary: '#111827' } },
            error: { iconTheme: { primary: '#ef4444', secondary: '#111827' } },
          }}
        />

        <Routes>
          {/* Public */}
          <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />

          {/* Protected */}
          <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/flashcards" element={<PrivateRoute><FlashCards /></PrivateRoute>} />
          <Route path="/leaderboard" element={<PrivateRoute><Leaderboard /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/quiz" element={<PrivateRoute><QuizPage /></PrivateRoute>} />
          <Route path="/:topicId" element={<PrivateRoute><TopicPage /></PrivateRoute>} />
          <Route path="/:topicId/:conceptId" element={<PrivateRoute><ConceptPage /></PrivateRoute>} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </GoogleOAuthProvider>
);

export default App;
