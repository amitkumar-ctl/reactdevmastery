import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import styles from './Auth.module.css';

export const LoginPage = () => {
  const { login, googleLogin } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) return toast.error('Please fill in all fields');
    setLoading(true);
    try {
      await login(form.email, form.password);
      toast.success('Welcome back! 🎉');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async (credential) => {
    try {
      await googleLogin(credential);
      toast.success('Welcome! 🎉');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Google login failed');
    }
  };

  return (
    <div className={styles.authPage}>
      <div className={styles.authCard}>
        <div className={styles.authLogo}>
          <div className={styles.logoIcon}>⚡</div>
          <div>
            <div className={styles.logoText}>DEVMASTERY</div>
            <div className={styles.logoSub}>SENIOR FRONTEND ACADEMY</div>
          </div>
        </div>

        <h1 className={styles.authTitle}>Welcome back</h1>
        <p className={styles.authSub}>Continue your path to senior engineer</p>

        <div className={styles.googleWrap}>
          <GoogleLogin
            onSuccess={(res) => handleGoogle(res.credential)}
            onError={() => toast.error('Google sign-in failed')}
            theme="filled_black"
            shape="rectangular"
            size="large"
            width="100%"
            text="continue_with"
          />
        </div>

        <div className={styles.divider}><span>or continue with email</span></div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>Email</label>
            <input
              className={styles.input}
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              autoComplete="email"
            />
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label}>Password</label>
            <div className={styles.passWrap}>
              <input
                className={styles.input}
                type={showPass ? 'text' : 'password'}
                placeholder="Your password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                autoComplete="current-password"
              />
              <button type="button" className={styles.eyeBtn} onClick={() => setShowPass(!showPass)}>
                {showPass ? '🙈' : '👁'}
              </button>
            </div>
          </div>

          <button className={styles.submitBtn} type="submit" disabled={loading}>
            {loading ? <span className={styles.spinner} /> : 'Sign In →'}
          </button>
        </form>

        <p className={styles.switchLink}>
          Don't have an account? <Link to="/register">Create one →</Link>
        </p>
      </div>

      <div className={styles.authVisual}>
        <AuthVisual />
      </div>
    </div>
  );
};

export const RegisterPage = () => {
  const { register, googleLogin } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) return toast.error('Please fill in all fields');
    if (form.password.length < 8) return toast.error('Password must be at least 8 characters');
    if (form.password !== form.confirm) return toast.error('Passwords do not match');
    setLoading(true);
    try {
      await register(form.name, form.email, form.password);
      toast.success('Account created! Welcome 🚀');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async (credential) => {
    try {
      await googleLogin(credential);
      toast.success('Welcome to DevMastery! 🚀');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Google sign-up failed');
    }
  };

  const strength = form.password.length === 0 ? 0
    : form.password.length < 8 ? 1
    : form.password.length < 12 ? 2 : 3;
  const strengthLabel = ['', 'Weak', 'Good', 'Strong'][strength];
  const strengthColor = ['', '#ef4444', '#eab308', '#00ff88'][strength];

  return (
    <div className={styles.authPage}>
      <div className={styles.authCard}>
        <div className={styles.authLogo}>
          <div className={styles.logoIcon}>⚡</div>
          <div>
            <div className={styles.logoText}>DEVMASTERY</div>
            <div className={styles.logoSub}>SENIOR FRONTEND ACADEMY</div>
          </div>
        </div>

        <h1 className={styles.authTitle}>Create your account</h1>
        <p className={styles.authSub}>Join 10,000+ engineers levelling up</p>

        <div className={styles.googleWrap}>
          <GoogleLogin
            onSuccess={(res) => handleGoogle(res.credential)}
            onError={() => toast.error('Google sign-up failed')}
            theme="filled_black"
            shape="rectangular"
            size="large"
            width="100%"
            text="signup_with"
          />
        </div>

        <div className={styles.divider}><span>or sign up with email</span></div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>Full Name</label>
            <input
              className={styles.input}
              type="text"
              placeholder="Jane Smith"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              autoComplete="name"
            />
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label}>Email</label>
            <input
              className={styles.input}
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              autoComplete="email"
            />
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label}>Password</label>
            <div className={styles.passWrap}>
              <input
                className={styles.input}
                type={showPass ? 'text' : 'password'}
                placeholder="At least 8 characters"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                autoComplete="new-password"
              />
              <button type="button" className={styles.eyeBtn} onClick={() => setShowPass(!showPass)}>
                {showPass ? '🙈' : '👁'}
              </button>
            </div>
            {form.password && (
              <div className={styles.strengthWrap}>
                <div className={styles.strengthBar}>
                  {[1,2,3].map(i => (
                    <div key={i} className={styles.strengthSegment}
                      style={{ background: i <= strength ? strengthColor : '#1e2d40' }} />
                  ))}
                </div>
                <span style={{ color: strengthColor, fontSize: 11 }}>{strengthLabel}</span>
              </div>
            )}
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label}>Confirm Password</label>
            <input
              className={styles.input}
              type={showPass ? 'text' : 'password'}
              placeholder="Repeat your password"
              value={form.confirm}
              onChange={(e) => setForm({ ...form, confirm: e.target.value })}
              autoComplete="new-password"
            />
          </div>

          <button className={styles.submitBtn} type="submit" disabled={loading}>
            {loading ? <span className={styles.spinner} /> : 'Create Account →'}
          </button>
        </form>

        <p className={styles.switchLink}>
          Already have an account? <Link to="/login">Sign in →</Link>
        </p>
      </div>

      <div className={styles.authVisual}>
        <AuthVisual />
      </div>
    </div>
  );
};

// Decorative right-side visual
const AuthVisual = () => (
  <div className={styles.visual}>
    <div className={styles.visualTitle}>Master the skills that matter</div>
    <div className={styles.visualSub}>Everything a senior frontend engineer needs to know</div>
    <div className={styles.featureList}>
      {[
        { icon: '⚡', text: 'JavaScript internals & the Event Loop' },
        { icon: '⚛️', text: 'React Fiber, hooks, and performance' },
        { icon: '🔒', text: 'Security: XSS, CSRF, JWT, OAuth' },
        { icon: '📊', text: 'Core Web Vitals & performance budgets' },
        { icon: '🏗️', text: 'System design & architecture patterns' },
        { icon: '🤖', text: 'AI-powered explanations & code review' },
      ].map((f, i) => (
        <div key={i} className={styles.featureItem}>
          <span className={styles.featureIcon}>{f.icon}</span>
          <span>{f.text}</span>
        </div>
      ))}
    </div>
    <div className={styles.visualStats}>
      {[['200+', 'Concepts'], ['50+', 'Quizzes'], ['12', 'Flash Cards'], ['AI', 'Tutor']].map(([n, l]) => (
        <div key={l} className={styles.visualStat}>
          <div className={styles.visualStatNum}>{n}</div>
          <div className={styles.visualStatLabel}>{l}</div>
        </div>
      ))}
    </div>
  </div>
);
