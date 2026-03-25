import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Habit } from '../types';
import { generateId } from '../utils/habitUtils';
import { getTodayISO } from '../utils/dateUtils';
import { DEFAULT_HABITS } from '../constants/defaultHabits';

interface HabitStore {
  habits: Habit[];
  hydrated: boolean;
  setHydrated: (v: boolean) => void;
  addHabit: (habit: Omit<Habit, 'id' | 'createdAt' | 'startDate' | 'completedDates'>) => void;
  deleteHabit: (id: string) => void;
  editHabit: (id: string, updates: Partial<Habit>) => void;
  toggleCheckIn: (id: string, date?: string) => void;
  initDefaults: () => void;
}

export const useHabitStore = create<HabitStore>()(
  persist(
    (set, get) => ({
      habits: [],
      hydrated: false,
      setHydrated: (v) => set({ hydrated: v }),
      addHabit: (habitData) => {
        const today = getTodayISO();
        const habit: Habit = {
          ...habitData,
          id: generateId(),
          startDate: today,
          completedDates: [],
          createdAt: new Date().toISOString(),
        };
        set((state) => ({ habits: [...state.habits, habit] }));
      },
      deleteHabit: (id) =>
        set((state) => ({ habits: state.habits.filter((h) => h.id !== id) })),
      editHabit: (id, updates) =>
        set((state) => ({
          habits: state.habits.map((h) => (h.id === id ? { ...h, ...updates } : h)),
        })),
      toggleCheckIn: (id, date) => {
        const d = date ?? getTodayISO();
        set((state) => ({
          habits: state.habits.map((h) => {
            if (h.id !== id) return h;
            const hasDate = h.completedDates.includes(d);
            return {
              ...h,
              completedDates: hasDate
                ? h.completedDates.filter((cd) => cd !== d)
                : [...h.completedDates, d],
            };
          }),
        }));
      },
      initDefaults: () => {
        const { habits, addHabit } = get();
        // Clear stale habits that have emoji icons (from old storage)
        const hasEmojiIcons = habits.some((h) => /[\u{1F000}-\u{1FFFF}]/u.test(h.icon));
        if (habits.length === 0 || hasEmojiIcons) {
          set({ habits: [] });
          DEFAULT_HABITS.forEach((h) => addHabit(h));
        }
      },
    }),
    {
      name: 'habits-storage',
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    }
  )
);
