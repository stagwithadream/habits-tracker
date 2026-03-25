export type Habit = {
  id: string;
  title: string;
  description?: string;
  targetDays: number;
  startDate: string;
  completedDates: string[];
  color: string;
  icon: string;
  createdAt: string;
};

export type RootStackParamList = {
  HomeTab: undefined;
  GalleryTab: undefined;
  CalendarTab: undefined;
  SettingsTab: undefined;
};

export type HomeStackParamList = {
  Home: undefined;
  HabitDetail: { habitId: string };
  AddHabit: undefined;
};

export type CalendarStackParamList = {
  Calendar: undefined;
};
