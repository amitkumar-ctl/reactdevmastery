import React, { createContext, useContext, useState, useCallback } from 'react';
import api from '../utils/api';
import { useAuth } from './AuthContext';

const ProgressContext = createContext(null);

export const ProgressProvider = ({ children }) => {
  const { user, updateUser } = useAuth();

  const completedConcepts = user?.completedConcepts?.map((c) => c.conceptId) || [];
  const completedTopics = user?.completedTopics || [];
  const flashCardsSeen = user?.flashCardsSeen || [];
  const quizCorrect = user?.quizCorrect || 0;
  const quizTotal = user?.quizTotal || 0;
  const quizAccuracy = user?.quizAccuracy || 0;
  const streak = user?.streak || 0;
  const activityLog = user?.activityLog || {};

  const markConceptDone = useCallback(async (conceptId, topicId, allTopicConcepts) => {
    if (completedConcepts.includes(conceptId)) return;
    try {
      const { data } = await api.post('/progress/concept', { conceptId, topicId });
      updateUser(data.user);

      // Check if all concepts in topic are done now
      const newDone = data.user.completedConcepts.map((c) => c.conceptId);
      const allDone = allTopicConcepts.every((id) => newDone.includes(id));
      if (allDone && !data.user.completedTopics.includes(topicId)) {
        const topicRes = await api.post('/progress/topic', { topicId });
        updateUser(topicRes.data.user);
      }
    } catch (err) {
      console.error('Failed to save concept progress:', err);
    }
  }, [completedConcepts, updateUser]);

  const recordQuiz = useCallback(async (conceptId, topicId, correct) => {
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
  }, [updateUser]);

  const markFlashSeen = useCallback(async (index) => {
    if (flashCardsSeen.includes(index)) return;
    try {
      const { data } = await api.post('/progress/flash', { indices: [index] });
      updateUser({ flashCardsSeen: data.flashCardsSeen });
    } catch (err) {
      console.error('Failed to save flash card:', err);
    }
  }, [flashCardsSeen, updateUser]);

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
      completedConcepts, completedTopics, flashCardsSeen,
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
