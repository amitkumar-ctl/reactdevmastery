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
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage  from './pages/ResetPasswordPage';
import QuizPage from './pages/QuizPage';
import PrivacyPolicy from './pages/legal/PrivacyPolicy';
import TermsOfService from './pages/legal/TermsOfService';
import GuestBanner from './components/guest/GuestBanner';
import LandingPage from './pages/LandingPage';
import Search from './components/search/Search';
import logoMaster from './assets/logo-master.svg';

// ── Loading screen ─────────────────────────────────────────────────────
const LoadingScreen = () => (
  <div style={{
    height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
    background: '#0a0e1a', fontFamily: 'Fira Code, monospace',
    flexDirection: 'column', gap: 16,
  }}>
    <img src={logoMaster} alt="ReactDevMastery" style={{ width: 56, height: 56 }} />
    <div style={{ color: '#9ca3af', fontSize: 13, letterSpacing: 2 }}>LOADING...</div>
  </div>
);

// ── Route wrappers ─────────────────────────────────────────────────────
const RootRoute = () => {
  const { user, loading } = useAuth();
  if (loading) return <LoadingScreen />;
  if (!user) return <LandingPage />;
  return (
    <ProgressProvider>
      <AppLayout><Dashboard /></AppLayout>
    </ProgressProvider>
  );
};

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <LoadingScreen />;
  if (!user) return <Navigate to="/js-core" replace />;
  return (
    <ProgressProvider>
      <AppLayout>{children}</AppLayout>
    </ProgressProvider>
  );
};

const GuestRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <LoadingScreen />;
  if (user) {
    return (
      <ProgressProvider>
        <AppLayout>{children}</AppLayout>
      </ProgressProvider>
    );
  }
  return (
    <ProgressProvider>
      <AppLayout>
        <GuestBanner />
        {children}
      </AppLayout>
    </ProgressProvider>
  );
};

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <LoadingScreen />;
  if (user) return <Navigate to="/" replace />;
  return children;
};

const SearchProvider = ({ children }) => {
  const [searchOpen, setSearchOpen] = React.useState(false);
  React.useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);
  return (
    <>
      {children}
      {searchOpen && <Search onClose={() => setSearchOpen(false)} />}
    </>
  );
};

// ── App ────────────────────────────────────────────────────────────────
const App = () => (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || 'placeholder'}>
      <AuthProvider>
        <BrowserRouter>
          <SearchProvider>
            <Toaster
              position="bottom-right"
              toastOptions={{
                style: {
                  background: '#111827', color: '#e2e8f0',
                  border: '1px solid #1e2d40',
                  fontFamily: 'Fira Code, monospace', fontSize: '13px',
                },
                success: { iconTheme: { primary: '#00ff88', secondary: '#111827' } },
                error:   { iconTheme: { primary: '#ef4444', secondary: '#111827' } },
              }}
            />

            <Routes>
              <Route path="/forgot-password"       element={<PublicRoute><ForgotPasswordPage /></PublicRoute>} />
              <Route path="/reset-password/:token" element={<PublicRoute><ResetPasswordPage /></PublicRoute>} />
              <Route path="/login"                 element={<PublicRoute><LoginPage /></PublicRoute>} />
              <Route path="/register"              element={<PublicRoute><RegisterPage /></PublicRoute>} />

              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms"   element={<TermsOfService />} />

              <Route path="/" element={<RootRoute />} />

              <Route path="/flashcards" element={<PrivateRoute><FlashCards /></PrivateRoute>} />
              <Route path="/profile"    element={<PrivateRoute><Profile /></PrivateRoute>} />
              <Route path="/quiz"       element={<PrivateRoute><QuizPage /></PrivateRoute>} />

              <Route path="/leaderboard"         element={<GuestRoute><Leaderboard /></GuestRoute>} />
              <Route path="/:topicId"            element={<GuestRoute><TopicPage /></GuestRoute>} />
              <Route path="/:topicId/:conceptId" element={<GuestRoute><ConceptPage /></GuestRoute>} />

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </SearchProvider>
        </BrowserRouter>
      </AuthProvider>
    </GoogleOAuthProvider>
);

export default App;