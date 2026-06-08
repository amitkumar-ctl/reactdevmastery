import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../utils/api';
import styles from '../components/auth/Auth.module.css';

const ForgotPasswordPage = () => {
  const [email, setEmail]       = useState('');
  const [loading, setLoading]   = useState(false);
  const [sent, setSent]         = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return toast.error('Please enter your email');
    setLoading(true);
    try {
      const { data } = await api.post('/auth/forgot-password', { email });
      toast.success(data.message);
      setSent(true);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.authPage}>
      <div className={styles.authCard}>
        <div className={styles.authLogo}>
          <div className={styles.logoIcon}>⚡</div>
          <div>
            <div className={styles.logoText}>REACTDEVMASTERY</div>
            <div className={styles.logoSub}>SENIOR FRONTEND ACADEMY</div>
          </div>
        </div>

        {sent ? (
          <div style={{ textAlign: 'center', padding: '24px 0' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>📬</div>
            <h2 className={styles.authTitle}>Check your email</h2>
            <p className={styles.authSub}>
              If <strong style={{ color: '#e2e8f0' }}>{email}</strong> is registered,
              you'll receive a reset link within a few minutes.
            </p>
            <p style={{ fontSize: 12, color: '#4b5563', marginTop: 24, lineHeight: 1.6 }}>
              Didn't get it? Check your spam folder or{' '}
              <span
                style={{ color: '#4facfe', cursor: 'pointer' }}
                onClick={() => setSent(false)}
              >
                try again
              </span>.
            </p>
          </div>
        ) : (
          <>
            <h1 className={styles.authTitle}>Forgot your password?</h1>
            <p className={styles.authSub}>
              Enter your email and we'll send you a reset link.
            </p>

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>Email address</label>
                <input
                  className={styles.input}
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoFocus
                  autoComplete="email"
                />
              </div>

              <button className={styles.submitBtn} type="submit" disabled={loading}>
                {loading ? <span className={styles.spinner} /> : 'Send Reset Link →'}
              </button>
            </form>
          </>
        )}

        <p className={styles.switchLink}>
          <Link to="/login">← Back to sign in</Link>
        </p>
      </div>

      <div className={styles.authVisual}>
        <div className={styles.visual}>
          <div className={styles.visualTitle}>Don't worry, it happens</div>
          <div className={styles.visualSub}>We'll get you back in seconds</div>
          <div className={styles.featureList}>
            {[
              { icon: '🔒', text: 'Secure reset link sent to your email' },
              { icon: '⏱', text: 'Link expires in 1 hour for security' },
              { icon: '🔄', text: 'All sessions invalidated on reset' },
              { icon: '✓',  text: 'Your progress is safely preserved' },
            ].map((f, i) => (
              <div key={i} className={styles.featureItem}>
                <span className={styles.featureIcon}>{f.icon}</span>
                <span>{f.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;