import { Habit } from '../types';
import { getTodayISO } from './dateUtils';

export const calculateCurrentStreak = (habit: Habit): number => {
  const sorted = [...habit.completedDates].sort().reverse();
  if (sorted.length === 0) return 0;
  let streak = 0;
  let current = new Date(getTodayISO());
  for (let i = 0; i < sorted.length; i++) {
    const dateStr = current.toISOString().split('T')[0];
    if (sorted.includes(dateStr)) {
      streak++;
      current.setDate(current.getDate() - 1);
    } else if (i === 0) {
      // Allow today to be missing
      current.setDate(current.getDate() - 1);
    } else {
      break;
    }
  }
  return streak;
};

export const calculateLongestStreak = (habit: Habit): number => {
  if (habit.completedDates.length === 0) return 0;
  const sorted = [...habit.completedDates].sort();
  let longest = 1;
  let current = 1;
  for (let i = 1; i < sorted.length; i++) {
    const prev = new Date(sorted[i - 1]);
    const curr = new Date(sorted[i]);
    const diff = (curr.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24);
    if (diff === 1) {
      current++;
      longest = Math.max(longest, current);
    } else {
      current = 1;
    }
  }
  return longest;
};

export const calculateProgress = (habit: Habit): number => {
  return Math.min(habit.completedDates.length / habit.targetDays, 1);
};

export const isCheckedInToday = (habit: Habit): boolean => {
  return habit.completedDates.includes(getTodayISO());
};

export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};
