import { Habit } from '../types';
import { getTodayISO } from '../utils/dateUtils';

export const DEFAULT_HABITS: Omit<Habit, 'id' | 'createdAt' | 'startDate' | 'completedDates'>[] = [
  {
    title: 'Sleep Cycle',
    description: '11 PM to 7 AM',
    targetDays: 21,
    color: '#6C63FF',
    icon: '🌙',
  },
  {
    title: 'Read 10 Pages Non-Fiction',
    description: 'Daily reading habit',
    targetDays: 30,
    color: '#4FACFE',
    icon: '📖',
  },
  {
    title: 'Drink 8 Glasses of Water',
    description: 'Stay hydrated throughout the day',
    targetDays: 30,
    color: '#43E97B',
    icon: '💧',
  },
  {
    title: '30-Minute Walk',
    description: 'Daily outdoor walk',
    targetDays: 21,
    color: '#FA709A',
    icon: '🏃',
  },
];
