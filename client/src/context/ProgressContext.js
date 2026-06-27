import React, { createContext, useContext, useState, useCallback } from 'react';
import api from '../utils/api';
import { useAuth } from './AuthContext';
import { CONCEPTS } from 'reactdevmastery-content/data';

const ProgressContext = createContext(null);

export const ProgressProvider = ({ children }) => {
  const { user, updateUser } = useAuth();

  const completedConcepts = user?.completedConcepts?.map((c) => c.conceptId) || [];
  const completedTopics = [...new Set(user?.completedTopics || [])];
  const totalTopics = Object.keys(CONCEPTS).length;
  const flashCardsSeen = user?.flashCardsSeen || [];
  const quizCorrect = user?.quizCorrect || 0;
  const quizTotal = user?.quizTotal || 0;
  const quizAccuracy = user?.quizAccuracy || 0;
  const streak = user?.streak || 0;
  const activityLog = user?.activityLog || {};

  const markConceptDone = useCallback(async (conceptId, topicId, allTopicConcepts) => {
    if (!user) return; // guest — no-op, SignupPrompt handles the UX
    if (completedConcepts.includes(conceptId)) return;
    try {
      const { data } = await api.post('/progress/concept', { conceptId, topicId });
      updateUser(data.user);
      const newDone = data.user.completedConcepts.map((c) => c.conceptId);
      const allDone = allTopicConcepts.every((id) => newDone.includes(id));
      if (allDone && !data.user.completedTopics.includes(topicId)) {
        const topicRes = await api.post('/progress/topic', { topicId });
        updateUser(topicRes.data.user);
      }
    } catch (err) {
      console.error('Failed to save concept progress:', err);
    }
  }, [user, completedConcepts, updateUser]);

  const recordQuiz = useCallback(async (conceptId, topicId, correct) => {
    if (!user) return; // guest — no-op
    try {
      const { data } = await api.post('/progress/quiz', { conceptId, topicId, correct });
      updateUser({
        quizCorrect: data.stats.quizCorrect,
        quizTotal: data.stats.quizTotal,
        quizAccuracy: data.stats.quizAccuracy,
      });
    } catch (err) {
      console.error('Failed to record quiz:', err);
    }
  }, [user, updateUser]);

  const markFlashSeen = useCallback(async (index) => {
    if (!user) return; // guest — no-op
    if (flashCardsSeen.includes(index)) return;
    try {
      const { data } = await api.post('/progress/flash', { indices: [index] });
      updateUser({ flashCardsSeen: data.flashCardsSeen });
    } catch (err) {
      console.error('Failed to save flash card:', err);
    }
  }, [user, flashCardsSeen, updateUser]);

  const resetProgress = useCallback(async () => {
    try {
      const { data } = await api.delete('/progress/reset');
      updateUser(data.user);
    } catch (err) {
      console.error('Failed to reset progress:', err);
    }
  }, [updateUser]);

  return (
    <ProgressContext.Provider value={{
      completedConcepts, completedTopics, totalTopics, flashCardsSeen,
      quizCorrect, quizTotal, quizAccuracy,
      streak, activityLog,
      markConceptDone, recordQuiz, markFlashSeen, resetProgress,
    }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error('useProgress must be inside ProgressProvider');
  return ctx;
};