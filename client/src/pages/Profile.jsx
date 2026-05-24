import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useProgress } from '../context/ProgressContext';
import api from '../utils/api';
import toast from 'react-hot-toast';
import styles from './Profile.module.css';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const { quizCorrect, quizTotal, quizAccuracy, completedTopics, completedConcepts, streak, resetProgress } = useProgress();
  const [name, setName] = useState(user?.name || '');
  const [saving, setSaving] = useState(false);
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [savingPass, setSavingPass] = useState(false);

  const initials = user?.name?.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) || '?';

  const saveProfile = async (e) => {
    e.preventDefault();
    if (!name.trim() || name.trim().length < 2) return toast.error('Name must be at least 2 characters');
    setSaving(true);
    try {
      const { data } = await api.patch('/users/profile', { name });
      updateUser(data.user);
      toast.success('Profile updated!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
    } finally {
      setSaving(false);
    }
  };

  const savePassword = async (e) => {
    e.preventDefault();
    if (!currentPass || !newPass) return toast.error('Fill in both password fields');
    if (newPass.length < 8) return toast.error('New password must be at least 8 characters');
    setSavingPass(true);
    try {
      await api.patch('/users/password', { currentPassword: currentPass, newPassword: newPass });
      toast.success('Password updated!');
      setCurrentPass(''); setNewPass('');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Password update failed');
    } finally {
      setSavingPass(false);
    }
  };

  const handleReset = async () => {
    if (!window.confirm('Are you sure? This will delete ALL your progress — topics, quizzes, and streak. This cannot be undone.')) return;
    await resetProgress();
    toast.success('Progress reset');
  };

  return (
    <div className={styles.page}>
      <div className={styles.topbar}>
        <div className={styles.title}>⚙ Profile Settings</div>
      </div>

      <div className={styles.content}>
        {/* Stats summary */}
        <div className={styles.statsRow}>
          <div className={styles.avatarBlock}>
            {user?.avatar
              ? <img src={user.avatar} alt={user.name} className={styles.avatar} />
              : <div className={styles.avatarFallback}>{initials}</div>
            }
            <div className={styles.authProvider}>
              {user?.authProvider === 'google' ? '🔵 Google Account' : '📧 Email Account'}
            </div>
          </div>
          {[
            { num: streak, label: 'Day Streak', color: '#f97316' },
            { num: completedTopics.length, label: 'Topics Done', color: '#00ff88' },
            { num: quizTotal, label: 'Quiz Attempts', color: '#4facfe' },
            { num: `${quizAccuracy}%`, label: 'Accuracy', color: '#a855f7' },
          ].map((s, i) => (
            <div key={i} className={styles.statCard}>
              <div className={styles.statNum} style={{ color: s.color }}>{s.num}</div>
              <div className={styles.statLabel}>{s.label}</div>
            </div>
          ))}
        </div>

        <div className={styles.twoCol}>
          {/* Left */}
          <div>
            <div className={styles.panel}>
              <div className={styles.sectionTitle}>Personal Info</div>
              <form onSubmit={saveProfile} className={styles.form}>
                <div className={styles.field}>
                  <label className={styles.label}>Full Name</label>
                  <input className={styles.input} value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Email</label>
                  <input className={styles.input} value={user?.email || ''} disabled style={{ opacity: 0.5 }} />
                  <div className={styles.fieldHint}>Email cannot be changed</div>
                </div>
                <button className={styles.btnPrimary} type="submit" disabled={saving}>
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </form>
            </div>

            {user?.authProvider === 'local' && (
              <div className={styles.panel} style={{ marginTop: 16 }}>
                <div className={styles.sectionTitle}>Change Password</div>
                <form onSubmit={savePassword} className={styles.form}>
                  <div className={styles.field}>
                    <label className={styles.label}>Current Password</label>
                    <input className={styles.input} type="password" value={currentPass} onChange={e => setCurrentPass(e.target.value)} />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>New Password</label>
                    <input className={styles.input} type="password" value={newPass} onChange={e => setNewPass(e.target.value)} placeholder="At least 8 characters" />
                  </div>
                  <button className={styles.btnPrimary} type="submit" disabled={savingPass}>
                    {savingPass ? 'Updating...' : 'Update Password'}
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* Right */}
          <div>
            <div className={styles.panel}>
              <div className={styles.sectionTitle}>Account</div>
              <div className={styles.infoRow}><span className={styles.infoLabel}>Member since</span><span>{new Date(user?.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span></div>
              <div className={styles.infoRow}><span className={styles.infoLabel}>Auth method</span><span style={{ textTransform: 'capitalize' }}>{user?.authProvider}</span></div>
              <div className={styles.infoRow}><span className={styles.infoLabel}>Concepts read</span><span style={{ color: '#4facfe' }}>{completedConcepts.length}</span></div>
              <div className={styles.infoRow}><span className={styles.infoLabel}>Topics completed</span><span style={{ color: '#00ff88' }}>{completedTopics.length}</span></div>
              <div className={styles.infoRow}><span className={styles.infoLabel}>Quiz correct</span><span style={{ color: '#00ff88' }}>{quizCorrect} / {quizTotal}</span></div>
            </div>

            <div className={styles.panel} style={{ marginTop: 16, borderColor: '#5f1a1a' }}>
              <div className={styles.sectionTitle} style={{ color: '#ef4444' }}>Danger Zone</div>
              <p className={styles.dangerText}>Reset all your progress. This cannot be undone.</p>
              <button className={styles.btnDanger} onClick={handleReset}>Reset All Progress</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
