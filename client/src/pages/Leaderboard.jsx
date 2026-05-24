import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import styles from './Leaderboard.module.css';

const Leaderboard = () => {
  const { user } = useAuth();
  const [board, setBoard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/users/leaderboard')
      .then(r => setBoard(r.data.leaderboard))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const medals = ['🥇', '🥈', '🥉'];

  return (
    <div className={styles.page}>
      <div className={styles.topbar}>
        <div className={styles.title}>🏆 Leaderboard</div>
        <div className={styles.sub}>Top engineers by quiz performance</div>
      </div>

      <div className={styles.content}>
        {loading ? (
          <div className={styles.loading}>Loading leaderboard...</div>
        ) : board.length === 0 ? (
          <div className={styles.empty}>No scores yet. Take some quizzes to appear here!</div>
        ) : (
          <div className={styles.panel}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>#</th><th>Engineer</th><th>Correct</th><th>Attempts</th><th>Accuracy</th><th>Topics</th><th>Streak</th>
                </tr>
              </thead>
              <tbody>
                {board.map((u, i) => {
                  const isMe = u.id === user?._id || u.id === user?.id;
                  return (
                    <tr key={u.id} className={isMe ? styles.myRow : ''}>
                      <td className={styles.rank}>{medals[i] || `#${i + 1}`}</td>
                      <td>
                        <div className={styles.userCell}>
                          {u.avatar
                            ? <img src={u.avatar} alt="" className={styles.avatar} />
                            : <div className={styles.avatarFallback}>{u.initials}</div>
                          }
                          <div>
                            <div className={styles.userName}>{u.name}{isMe && <span className={styles.youBadge}>you</span>}</div>
                          </div>
                        </div>
                      </td>
                      <td className={styles.green}>{u.quizCorrect}</td>
                      <td className={styles.muted}>{u.quizTotal}</td>
                      <td>
                        <span style={{ color: u.accuracy >= 70 ? '#00ff88' : u.accuracy >= 50 ? '#eab308' : '#ef4444', fontWeight: 700 }}>
                          {u.accuracy}%
                        </span>
                      </td>
                      <td className={styles.muted}>{u.topicsCompleted}</td>
                      <td className={styles.orange}>🔥 {u.streak}d</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
