export type GalleryHabit = {
  title: string;
  description: string;
  targetDays: number;
  color: string;
  icon: string;
};

export type GalleryCategory = {
  name: string;
  icon: string;
  data: GalleryHabit[];
};

export const GALLERY_CATEGORIES: GalleryCategory[] = [
  {
    name: 'Health & Fitness',
    icon: 'heart-pulse',
    data: [
      { title: 'Exercise 30 Minutes', description: 'Any workout — gym, yoga, or a run', targetDays: 30, color: '#FF6B8A', icon: 'dumbbell' },
      { title: 'Morning Meditation', description: '10 minutes of mindful breathing', targetDays: 21, color: '#BF5AF2', icon: 'meditation' },
      { title: 'Eat a Healthy Meal', description: 'One clean, whole-food meal a day', targetDays: 30, color: '#30D158', icon: 'food-apple' },
      { title: 'Take Vitamins', description: 'Daily supplements after breakfast', targetDays: 30, color: '#FF9F0A', icon: 'pill' },
      { title: '10,000 Steps', description: 'Stay active throughout the day', targetDays: 30, color: '#64D2FF', icon: 'shoe-print' },
    ],
  },
  {
    name: 'Mindfulness & Growth',
    icon: 'head-heart-outline',
    data: [
      { title: 'Journal 5 Minutes', description: 'Write down thoughts or reflections', targetDays: 21, color: '#7C6EF6', icon: 'notebook-outline' },
      { title: 'Read 20 Minutes', description: 'Books, articles, or long-form writing', targetDays: 30, color: '#64D2FF', icon: 'book-open-page-variant' },
      { title: 'Learn Something New', description: 'A new skill, language, or concept', targetDays: 30, color: '#FF9F0A', icon: 'head-lightbulb-outline' },
      { title: 'Practice Gratitude', description: 'List 3 things you are grateful for', targetDays: 21, color: '#FF6B8A', icon: 'hand-heart' },
    ],
  },
  {
    name: 'Productivity',
    icon: 'rocket-launch-outline',
    data: [
      { title: 'No Phone First Hour', description: 'Start the morning screen-free', targetDays: 21, color: '#BF5AF2', icon: 'cellphone-off' },
      { title: 'Plan Tomorrow Tonight', description: 'Write tomorrow\'s top 3 priorities', targetDays: 30, color: '#30D158', icon: 'clipboard-check-outline' },
      { title: 'Deep Work 2 Hours', description: 'Focused, uninterrupted work block', targetDays: 30, color: '#7C6EF6', icon: 'target' },
      { title: 'Tidy Workspace', description: 'Clean desk before starting work', targetDays: 14, color: '#FF6723', icon: 'broom' },
    ],
  },
  {
    name: 'Wellness',
    icon: 'spa-outline',
    data: [
      { title: 'Drink 8 Glasses of Water', description: 'Stay hydrated throughout the day', targetDays: 30, color: '#64D2FF', icon: 'water' },
      { title: 'Sleep by 11 PM', description: 'Consistent bedtime for better rest', targetDays: 21, color: '#7C6EF6', icon: 'moon-waning-crescent' },
      { title: 'No Sugar', description: 'Avoid added sugars and sweets', targetDays: 30, color: '#FF6723', icon: 'candy-off-outline' },
      { title: 'Spend Time Outdoors', description: '20 minutes of fresh air and nature', targetDays: 21, color: '#30D158', icon: 'tree' },
    ],
  },
];
