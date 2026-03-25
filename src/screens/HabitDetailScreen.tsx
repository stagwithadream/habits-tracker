import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, Alert,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../constants/ThemeContext';
import { useHabits } from '../hooks/useHabits';
import { ProgressBar } from '../components/ProgressBar';
import { HomeStackParamList } from '../types';
import { formatDate, getTodayISO, getDatesBetween } from '../utils/dateUtils';

type RouteType = RouteProp<HomeStackParamList, 'HabitDetail'>;

export const HabitDetailScreen: React.FC = () => {
  const { colors, spacing, typography, borderRadius } = useTheme();
  const navigation = useNavigation();
  const route = useRoute<RouteType>();
  const { habits, deleteHabit, getHabitStats } = useHabits();
  const habit = habits.find((h) => h.id === route.params.habitId);

  if (!habit) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ color: colors.text, ...typography.h3 }}>Habit not found</Text>
      </View>
    );
  }

  const stats = getHabitStats(habit);
  const allDates = getDatesBetween(habit.startDate, getTodayISO());

  const handleDelete = () => {
    Alert.alert('Delete Habit', `Are you sure you want to delete "${habit.title}"?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => { deleteHabit(habit.id); navigation.goBack(); } },
    ]);
  };

  const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    header: {
      padding: spacing.md,
      paddingTop: spacing.xxl,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    backBtn: { ...typography.body, color: colors.primary },
    deleteBtn: { ...typography.body, color: colors.error },
    heroCard: {
      margin: spacing.md,
      padding: spacing.lg,
      backgroundColor: colors.card,
      borderRadius: borderRadius.xl,
      borderTopWidth: 4,
      borderTopColor: habit.color,
    },
    iconTitle: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm },
    iconWrap: { marginRight: spacing.sm },
    title: { ...typography.h2, color: colors.text, flex: 1 },
    description: { ...typography.body, color: colors.textSecondary, marginBottom: spacing.md },
    dateText: { ...typography.caption, color: colors.textSecondary },
    statsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spacing.sm,
      margin: spacing.md,
    },
    statCard: {
      flex: 1,
      minWidth: '45%',
      backgroundColor: colors.card,
      borderRadius: borderRadius.lg,
      padding: spacing.md,
      alignItems: 'center',
    },
    statValue: { ...typography.h2, color: habit.color },
    statLabel: { ...typography.caption, color: colors.textSecondary, marginTop: 4 },
    sectionTitle: { ...typography.h3, color: colors.text, marginHorizontal: spacing.md, marginTop: spacing.md, marginBottom: spacing.sm },
    heatmap: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 4,
      paddingHorizontal: spacing.md,
    },
    heatCell: {
      width: 16,
      height: 16,
      borderRadius: 3,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} accessibilityLabel="Go back">
          <Text style={styles.backBtn}>← Back</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleDelete} accessibilityLabel="Delete habit">
          <Text style={styles.deleteBtn}>Delete</Text>
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.heroCard}>
          <View style={styles.iconTitle}>
            <View style={styles.iconWrap}>
              <MaterialCommunityIcons name={habit.icon as any} size={36} color={habit.color} />
            </View>
            <Text style={styles.title}>{habit.title}</Text>
          </View>
          {habit.description ? <Text style={styles.description}>{habit.description}</Text> : null}
          <ProgressBar progress={stats.progress} color={habit.color} height={8} />
          <Text style={[styles.dateText, { marginTop: spacing.sm }]}>
            Started {formatDate(habit.startDate)} · {habit.targetDays} day goal
          </Text>
        </View>

        <View style={styles.statsGrid}>
          {[
            { iconName: 'fire' as const, value: `${stats.currentStreak}`, label: 'Current Streak' },
            { iconName: 'lightning-bolt' as const, value: `${stats.longestStreak}`, label: 'Longest Streak' },
            { iconName: 'check-circle' as const, value: `${stats.totalCheckIns}`, label: 'Total Check-ins' },
            { iconName: null, value: `${stats.completionPercentage}%`, label: 'Completion' },
          ].map((s, i) => (
            <View key={i} style={styles.statCard}>
              <Text style={styles.statValue}>{s.iconName ? <MaterialCommunityIcons name={s.iconName} size={20} color={habit.color} /> : null} {s.value}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>History</Text>
        <View style={styles.heatmap}>
          {allDates.map((date) => {
            const done = habit.completedDates.includes(date);
            return (
              <View
                key={date}
                style={[styles.heatCell, { backgroundColor: done ? habit.color : colors.border }]}
                accessibilityLabel={`${date}: ${done ? 'completed' : 'missed'}`}
              />
            );
          })}
        </View>

        <View style={{ height: spacing.xxl }} />
      </ScrollView>
    </View>
  );
};
