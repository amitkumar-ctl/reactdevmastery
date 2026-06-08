import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../utils/api';
import styles from '../components/auth/Auth.module.css';

const ResetPasswordPage = () => {
  const { token }                       = useParams();
  const navigate                        = useNavigate();
  const [form, setForm]                 = useState({ password: '', confirm: '' });
  const [loading, setLoading]           = useState(false);
  const [showPass, setShowPass]         = useState(false);
  const [done, setDone]                 = useState(false);

  const strength = form.password.length === 0 ? 0
    : form.password.length < 8  ? 1
    : form.password.length < 12 ? 2 : 3;
  const strengthLabel = ['', 'Weak', 'Good', 'Strong'][strength];
  const strengthColor = ['', '#ef4444', '#eab308', '#00ff88'][strength];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password.length < 8)
      return toast.error('Password must be at least 8 characters');
    if (form.password !== form.confirm)
      return toast.error('Passwords do not match');

    setLoading(true);
    try {
      const { data } = await api.post(`/auth/reset-password/${token}`, {
        password: form.password,
      });
      toast.success(data.message);
      setDone(true);
      setTimeout(() => navigate('/login'), 2500);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Reset failed — link may have expired');
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

        {done ? (
          <div style={{ textAlign: 'center', padding: '24px 0' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
            <h2 className={styles.authTitle}>Password updated!</h2>
            <p className={styles.authSub}>
              Redirecting you to sign in...
            </p>
          </div>
        ) : (
          <>
            <h1 className={styles.authTitle}>Set a new password</h1>
            <p className={styles.authSub}>Choose a strong password for your account.</p>

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>New Password</label>
                <div className={styles.passWrap}>
                  <input
                    className={styles.input}
                    type={showPass ? 'text' : 'password'}
                    placeholder="At least 8 characters"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    autoComplete="new-password"
                    autoFocus
                  />
                  <button
                    type="button"
                    className={styles.eyeBtn}
                    onClick={() => setShowPass(!showPass)}
                  >
                    {showPass ? '🙈' : '👁'}
                  </button>
                </div>
                {form.password && (
                  <div className={styles.strengthWrap}>
                    <div className={styles.strengthBar}>
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className={styles.strengthSegment}
                          style={{ background: i <= strength ? strengthColor : '#1e2d40' }}
                        />
                      ))}
                    </div>
                    <span style={{ color: strengthColor, fontSize: 11 }}>{strengthLabel}</span>
                  </div>
                )}
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>Confirm New Password</label>
                <input
                  className={styles.input}
                  type={showPass ? 'text' : 'password'}
                  placeholder="Repeat your new password"
                  value={form.confirm}
                  onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                  autoComplete="off"
                />
                {form.confirm && form.confirm !== form.password && (
                  <div style={{ fontSize: 11, color: '#ef4444', marginTop: 6 }}>
                    Passwords do not match
                  </div>
                )}
              </div>

              <button className={styles.submitBtn} type="submit" disabled={loading}>
                {loading ? <span className={styles.spinner} /> : 'Update Password →'}
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
          <div className={styles.visualTitle}>Almost there</div>
          <div className={styles.visualSub}>Choose a strong password to secure your account</div>
          <div className={styles.featureList}>
            {[
              { icon: '🔢', text: 'At least 8 characters' },
              { icon: '💪', text: 'Mix letters, numbers, and symbols' },
              { icon: '🚫', text: "Don't reuse passwords from other sites" },
              { icon: '🔄', text: 'All existing sessions will be signed out' },
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

export default ResetPasswordPage;