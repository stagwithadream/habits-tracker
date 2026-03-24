import { useHabitStore } from '../store/habitStore';
import { calculateCurrentStreak, calculateLongestStreak, calculateProgress, isCheckedInToday } from '../utils/habitUtils';
import { Habit } from '../types';

export const useHabits = () => {
  const store = useHabitStore();

  const getHabitStats = (habit: Habit) => ({
    currentStreak: calculateCurrentStreak(habit),
    longestStreak: calculateLongestStreak(habit),
    totalCheckIns: habit.completedDates.length,
    progress: calculateProgress(habit),
    completionPercentage: Math.round((habit.completedDates.length / habit.targetDays) * 100),
    isCheckedInToday: isCheckedInToday(habit),
  });

  return {
    ...store,
    getHabitStats,
  };
};
