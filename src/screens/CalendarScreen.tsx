import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useTheme } from '../constants/ThemeContext';
import { useHabitStore } from '../store/habitStore';
import { Habit } from '../types';

type MarkedDates = Record<string, { dots?: { color: string; key: string }[]; selected?: boolean; selectedColor?: string }>;

export const CalendarScreen: React.FC = () => {
  const { colors, spacing, typography, borderRadius } = useTheme();
  const { habits } = useHabitStore();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [filterHabitId, setFilterHabitId] = useState<string | null>(null);

  const filteredHabits = filterHabitId ? habits.filter((h) => h.id === filterHabitId) : habits;

  const markedDates: MarkedDates = {};
  filteredHabits.forEach((habit) => {
    habit.completedDates.forEach((date) => {
      if (!markedDates[date]) markedDates[date] = { dots: [] };
      markedDates[date].dots = [...(markedDates[date].dots ?? []), { color: habit.color, key: habit.id }];
    });
  });

  if (selectedDate) {
    markedDates[selectedDate] = {
      ...(markedDates[selectedDate] ?? {}),
      selected: true,
      selectedColor: colors.primary,
    };
  }

  const habitsOnDate = selectedDate
    ? filteredHabits.filter((h) => h.completedDates.includes(selectedDate))
    : [];

  const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    header: { padding: spacing.md, paddingTop: spacing.xxl },
    title: { ...typography.h1, color: colors.text },
    filterRow: { flexDirection: 'row', paddingHorizontal: spacing.md, marginBottom: spacing.sm, gap: spacing.sm },
    chip: {
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.xs,
      borderRadius: borderRadius.full,
      borderWidth: 1,
    },
    chipText: { ...typography.caption },
    dayDetail: {
      margin: spacing.md,
      backgroundColor: colors.card,
      borderRadius: borderRadius.lg,
      padding: spacing.md,
    },
    dayTitle: { ...typography.h3, color: colors.text, marginBottom: spacing.sm },
    habitRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: spacing.xs,
    },
    dot: { width: 10, height: 10, borderRadius: 5, marginRight: spacing.sm },
    habitName: { ...typography.body, color: colors.text },
    emptyDay: { ...typography.body, color: colors.textSecondary },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Calendar</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterRow}>
          <TouchableOpacity
            style={[styles.chip, { backgroundColor: !filterHabitId ? colors.primary + '33' : colors.card, borderColor: !filterHabitId ? colors.primary : colors.border }]}
            onPress={() => setFilterHabitId(null)}
            accessibilityLabel="Show all habits"
          >
            <Text style={[styles.chipText, { color: !filterHabitId ? colors.primary : colors.textSecondary }]}>All</Text>
          </TouchableOpacity>
          {habits.map((h) => (
            <TouchableOpacity
              key={h.id}
              style={[styles.chip, { backgroundColor: filterHabitId === h.id ? h.color + '33' : colors.card, borderColor: filterHabitId === h.id ? h.color : colors.border }]}
              onPress={() => setFilterHabitId(filterHabitId === h.id ? null : h.id)}
              accessibilityLabel={`Filter by ${h.title}`}
            >
              <Text style={[styles.chipText, { color: filterHabitId === h.id ? h.color : colors.textSecondary }]}>{h.icon} {h.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Calendar
          markingType="multi-dot"
          markedDates={markedDates}
          onDayPress={(day: { dateString: string }) => setSelectedDate(day.dateString === selectedDate ? null : day.dateString)}
          theme={{
            backgroundColor: colors.background,
            calendarBackground: colors.background,
            textSectionTitleColor: colors.textSecondary,
            selectedDayBackgroundColor: colors.primary,
            selectedDayTextColor: '#fff',
            todayTextColor: colors.primary,
            dayTextColor: colors.text,
            textDisabledColor: colors.border,
            monthTextColor: colors.text,
            arrowColor: colors.primary,
          }}
        />

        {selectedDate && (
          <View style={styles.dayDetail}>
            <Text style={styles.dayTitle}>{selectedDate}</Text>
            {habitsOnDate.length === 0 ? (
              <Text style={styles.emptyDay}>No check-ins on this day</Text>
            ) : (
              habitsOnDate.map((h) => (
                <View key={h.id} style={styles.habitRow}>
                  <View style={[styles.dot, { backgroundColor: h.color }]} />
                  <Text style={styles.habitName}>{h.icon} {h.title}</Text>
                </View>
              ))
            )}
          </View>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
};
